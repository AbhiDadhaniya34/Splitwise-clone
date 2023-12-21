import { useState } from "react";
import logo from "../image/Splitwise.jpg";
import axios from "axios";

function Signup(props) {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [message, setmessage] = useState();

  async function submit() {
    if (username == null || password == null) {
      return;
    }

    const result = await axios.post("http://localhost:1200/signup", {
      username,
      password,
    });

    setmessage(result.data.message);
    if (result.data.message === "User registered successfully") {
      props.setopen(false);
    }
  }

  return (
    <div className="h-screen flex gap-10 items-center justify-center ">
      <img src={logo} alt="logo" className="w-48 h-48" />
      <div className="grid">
        {message && <p>{message}</p>}
        <p className="text-gray-400 text-1xl mb-3">INTRODUCE YOURSELF</p>
        <p className="text-2xl mb-2">Hi there! My name is</p>
        <input
          placeholder="ENTER USERNAME"
          onChange={(e) => setusername(e.target.value)}
          className="h-12 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="mt-4">And here’s my password:</label>
        <input
          placeholder="ENTER PASSWORD"
          onChange={(e) => setpassword(e.target.value)}
          className="h-12 w-96 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          className="bg-orange-500 px-5 py-2 rounded-md mt-7"
          onClick={submit}
        >
          Sign Up Me
        </button>
      </div>
    </div>
  );
}

export default Signup;
