//mport React from "react";
//import GirlAvatar from "../assets/girl1.jpg";
import { GiRapidshareArrow } from "react-icons/gi";
//import { AiOutlineUserAdd } from "react-icons/ai";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../axios";
import { getImage } from "../getImage";
import { useAppSelector, useAppDispatch } from "../redux/hook/hook";
import { getAuth } from "../redux/slice/authSlice";
import moment from "moment";
import { setAllPosts, getPosts } from "../redux/slice/postSlice";
import { AiOutlineHeart } from "react-icons/ai";

type Props = {};

function NewFeed({}: Props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // select post
  const { user } = useAppSelector(getAuth);
  const { posts } = useAppSelector(getPosts);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/post/get-all-post");
      if (response.status == 200) {
        dispatch(setAllPosts(response.data));
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const likePost = async (post_id: String, type: String) => {
    const data = {
      post_id,
      user_id: user._id,
    };
    const newAllPosts = posts.map((post: any) => {
      if (type === "LIKE")
        return post._id === post_id ? { ...post, like: post.like + 1 , isLiked: true} : post;
      if (type === "UNLIKE")
        return post._id === post_id ? { ...post, like: post.like - 1, isLiked: false } : post;
    });
    dispatch(setAllPosts(newAllPosts));
    await AxiosInstance.post("/post/like-un-like", data);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        posts.map((post: any, index: number) => (
          <div
            className="bg-white dark:bg-gray-800 p-5 rounded-lg mt-5"
            key={index}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={getImage(post.profile_picture_path)}
                  className="h-10 w-10 object-cover rounded-full"
                />
                <div className="ml-5">
                  <h2 className="dark:text-gray-200 text-gray-800">
                    {post.username}
                  </h2>
                  <p className="text-sm ">{moment(post.createdAt).fromNow()}</p>
                </div>
              </div>

              {/* <AiOutlineUserAdd className="text-3xl text-cyan-800 bg-cyan-200 p-2 rounded-full cursor-pointer" /> */}
            </div>

            <p className="mt-2">{post.description}</p>

            <img
              src={getImage(post.image_path)}
              className="mt-2 rounded-lg h-[25rem] w-full object-cover"
            />

            <div className="flex mt-5 items-center">
              <div className="flex items-center">
                {post.isLiked ? (
                  <AiFillHeart
                    className="cursor-pointer hover:scale-110 transition-all text-lg text-red-500"
                    onClick={() => likePost(post._id, "UNLIKE")}
                  />
                ) : (
                  <AiOutlineHeart
                    className="cursor-pointer hover:scale-110 transition-all text-lg text-red-500"
                    onClick={() => likePost(post._id, "LIKE")}
                  />
                )}
                {post.like}
              </div>
              <AiOutlineComment className="cursor-pointer hover:scale-110 transition-all text-lg ml-2" />
              <GiRapidshareArrow className="cursor-pointer hover:scale-110 transition-all text-lg ml-2" />
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default NewFeed;
