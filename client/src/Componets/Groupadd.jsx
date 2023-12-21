import { useState } from "react";
import logo from "../image/Splitwise.jpg";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Groupadd() {
  const [groupname, setgroupname] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const type = "Add Newgroup";
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  function submit() {
    if (groupname == null) {
      return;
    }
    axios.post("http://localhost:1200/insertgroup", { groupname });
    navigate(`/home/${id}`);
    axios.post("http://localhost:1200/insertactivity", {
      userid: id,
      type: type,
      description: groupname,
      date: formattedDate,
    });
  }

  return (
    <div className="h-screen flex gap-10 items-center justify-center ">
      <img src={logo} alt="logo" className="w-48 h-48" />
      <div>
        <p className="text-gray-400 text-1xl mb-5">START A NEW GROUP</p>
        <p className="text-2xl mb-3">My group shall be called…</p>
        <input
          placeholder="The Breakfast Club"
          onChange={(e) => setgroupname(e.target.value)}
          className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
        />
        <button
          className="bg-orange-500 px-5 py-2 rounded-md mt-7"
          onClick={submit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Groupadd;
