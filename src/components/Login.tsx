/* import axios from "axios";
//import React from "react";
import { useState } from "react";
import { base_url } from "../base_url";
import { useAppDispatch } from "../redux/hook/hook";
import { setUser } from "../redux/slice/authSlice";

interface Props {}

const Login = (props: Props) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      return alert("Please Input All");
    }

    setLoading(true);

    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(base_url + "/auth/login", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        if (localStorage.getItem("token")) {
          dispatch(setUser(response.data.user));
        }
      }
    } catch (error: any) {
      alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[40%] w-[80%] md:w-[60%] lg:w-[30%] border p-5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center">

      <h1>Login</h1>
      <input
        type="text"
        placeholder="email ..."
        className="border rounded-lg px-5 py-1 mt-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password ..."
        value={password}
        className="border rounded-lg px-5 py-1 mt-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login} className="mt-2" disabled={loading}>
        {
          loading ? "Loading ..." : "Sign In"
        }
      </button>
    </div>
  );
};

export default Login;
 */