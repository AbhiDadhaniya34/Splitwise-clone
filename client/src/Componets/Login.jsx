import { useState } from "react";
import logo from "../image/Splitwise.jpg";
import { useNavigate } from "react-router-dom";
import Signup from "./signup";
import axios from "axios";

function Login() {
  const [open, setopen] = useState(false);
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [message, setmessage] = useState();
  const navigate = useNavigate();

  async function submit() {
    const result = await axios.post("http://localhost:1200/login", {
      username,
      password,
    });
    setmessage(result.data.message);
    if (result.data.message === "Login successful") {
      navigate(`/home/${result.data.userId}`);
    }
  }

  return (
    <>
      {open ? (
        <Signup setopen={setopen} />
      ) : (
        <div>
          <nav className="flex justify-between mx-10 mt-5">
            <div className="flex gap-3">
              <img src={logo} alt="logo" className="h-14 w-14" />
              <span className="my-auto font-bold text-xl">Splitwise</span>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => setopen(!open)}
                className="bg-teal-500 h-10 w-24 my-auto text-white"
              >
                signup
              </button>
            </div>
          </nav>

          <div className="mt-10 bg-gray-300 grid w-96 mx-auto p-10 rounded-lg">
            {message && <p>{message}</p>}
            <p className="text-xl my-2">Log in</p>
            <span>UserName</span>
            <input
              placeholder="enter Username"
              onChange={(e) => setusername(e.target.value)}
              className="border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <span className="mt-2">Password</span>
            <input
              placeholder="enter password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              className="border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="mt-4 bg-teal-500 p-2" onClick={submit}>
              Log In
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
