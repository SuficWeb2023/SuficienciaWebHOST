import { MdLocationPin, MdWork } from "react-icons/md";
import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { useAppSelector } from "../redux/hook/hook";
import { getAuth } from "../redux/slice/authSlice";
import { base_url } from "../base_url";

type Props = {};

function Profile({}: Props) {
  const { user } = useAppSelector(getAuth);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={base_url + "/" +user?.profile_picture_path}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-5">
            <h1 className="dark:text-gray-200">{user?.username}</h1>
            <p>{user?.friends?.length} friends</p>
          </div>
        </div>
       
      </div>

      <hr className="my-5" />

      <div className="flex items-center">
        <MdLocationPin className="text-lg" />
        <p className="ml-5">{user?.address}</p>
      </div>

      <div className="flex items-center mt-2">
        <MdWork className="text-lg" />
        <p className="ml-5">{user?.work}</p>
      </div>

      <hr className="my-5" />

      <div className="flex justify-between items-center">
        <p>Who view your profile ?</p>
        <h2>{user?.profile_view}</h2>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p>Impress from your friend </p>
        <h2>{user?.profile_view}</h2>
      </div>

      <hr className="my-5" />

      <h2>Social Media</h2>

      <div className="flex justify-between mt-5">
        <div className="flex items-center">
          <AiOutlineTwitter className="text-lg" />
          <p className="ml-5 font-semibold">Twitter</p>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex items-center">
          <AiFillLinkedin className="text-lg" />
          <p className="ml-5 font-semibold">LinkIn</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
