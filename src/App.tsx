import FriendList from "./components/FriendList";
import Header from "./components/Header";
import NewFeed from "./components/NewFeed";
import OnYourMind from "./components/OnYourMind";
import Profile from "./components/Profile";
import Sponsor from "./components/Sponsor";
import {  useAppDispatch } from "./redux/hook/hook";
import { setLoading, setUser } from "./redux/slice/authSlice";
import { useEffect } from "react";
// import Login from "./components/Login";
import axios from "axios";
import { base_url } from "./base_url";

function App() {
  const dispatch = useAppDispatch();
  // const { user, loading } = useAppSelector(getAuth);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(base_url + "/auth/check-auth", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.status == 200) {
          dispatch(setUser(response.data));
        }
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return(
/* 
  return loading ? (
    <h1>{loading}</h1>
  ) : user ? (*/
    <> 
      <Header/>
      
      <div className="bg-gradient-to-tr from-[#19141a] via-[#283d73]  to-[#e6b1c7] dark:bg-gray-600 h-[90vh] fixed top-[10vh] left-0 w-full py-5">
        <div className="container mx-auto flex justify-between gap-10">
          <div className="hidden lg:block flex-[0.6]">
            <Profile/>
            <Sponsor/>
          </div>

          <div className="flex-1 h-[90vh] overflow-auto pb-10">
            <OnYourMind/>
            <NewFeed/>
            <NewFeed/>
            <NewFeed/>
            <NewFeed/>
          </div>

          <div className="hidden lg:block flex-[0.6] h-[85vh]">

            <FriendList/>
          </div>
        </div>
      </div>
    </>
  // ) : (
    // <Login />
  );
}

export default App;
