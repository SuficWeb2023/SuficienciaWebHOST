//import React from "react";
import { BsFillImageFill, BsFillCameraVideoFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import { AxiosInstance } from "../axios";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hook/hook";
import { getAuth } from "../redux/slice/authSlice";
import { setAddPost } from "../redux/slice/postSlice";
import { getImage } from '../getImage';

type Props = {};

function OnYourMind({}: Props) {
  const [addPostPopup, setAddPostPopup] = useState(false);
  const { user } = useAppSelector(getAuth);
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File>();

  const addPost = async () => {

    if(!image){
      return alert("Please select an image !");
    }

    try {
      const data = {
        description,
        image,
        user_id: user._id,
        username: user.username,
        profile_picture_path: user.profile_picture_path,
      };
      const response = await AxiosInstance.post("/post/add-post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 201) {
        dispatch(setAddPost(response.data));
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setAddPostPopup(false);
  };

  return (
    <>
      {addPostPopup && (
        <>
          <div className="z-[100] bg-black w-full h-screen fixed top-0 left-0 opacity-50" onClick={() => setAddPostPopup(false)}></div>
          <div className="z-[200] p-5 w-[80%] md:w-[60%] lg:w-[40%] border  bg-white dark:bg-gray-800 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2  -translate-y-1/2">
          <textarea
            placeholder="Say Something ..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg bg-transparent border w-full h-[8rem] p-2"
          />
          <div className="flex items-center justify-between mt-2">
            <input type="file" onChange={(e) => setImage(e.target.files![0])} />
            <button onClick={addPost}>Post</button>
          </div>
        </div>
        </>
      )}

      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg">
        <div className="flex items-center">
          <img src={getImage(user?.profile_picture_path)} className="h-10 w-10 rounded-full object-cover" />
          <input
            type="text"
            placeholder="What on your mind ?"
            className="bg-gray-200 ml-5 rounded-full px-4 py-2 w-full text-sm"
          />
        </div>

        <hr className="my-2" />

        <div className="flex justify-between">
          <div
            className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-2 transition-all "
            onClick={() => setAddPostPopup(true)}
          >
            <BsFillImageFill />
            <p className="ml-1 lg:ml-2">Image</p>
          </div>

          <div className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-2 transition-all"
            onClick={() => setAddPostPopup(true)}
            >
            <BsFillCameraVideoFill />
            <p className="ml-1 lg:ml-2">Video</p>
          </div>

          <div className="flex items-center cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-2 transition-all">
            <MdAttachFile />
            <p className="ml-1 lg:ml-2">Attachment</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnYourMind;
