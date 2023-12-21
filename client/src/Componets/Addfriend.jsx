import { useState } from "react";
import logo from "../image/Splitwise.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";

function Addfriend(props) {
  const [username, setusername] = useState();
  const { id } = useParams();
  const type = "Add NewFriend";
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  async function submit() {
    if (username == null) {
      return;
    }
    await axios.post("http://localhost:1200/insertuser", { username });
    await axios.post("http://localhost:1200/insertactivity", {
      userid: id,
      type: type,
      description: username,
      date: formattedDate,
    });
    await axios.get("http://localhost:1200/alluser").then((response) => {
      props.setfriend(response.data);
      props.setopen(false);
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => props.setopen(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <div className="flex gap-3">
            <img src={logo} alt="" className="w-7 h-7 my-auto" />
            <p className="text-2xl">Invite friends</p>
          </div>
          <input
            className="h-10 w-full mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter Friend Name"
          />
          <textarea
            defaultValue="Enter Any Message"
            className="w-full mt-5  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end mt-3">
          <button className="bg-orange-500 px-5 py-2" onClick={submit}>
            Send invites and add friends
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addfriend;
