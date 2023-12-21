import { useEffect, useState } from "react";
import owed from "../image/owed.png";
import axios from "axios";

function Payusermenu(props) {
  const [payuser, setpayuser] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1200/alluser").then((response) => {
      setpayuser(response.data);
    });
  }, []);

  function submit(ids, username) {
    props.setpayusers(username);
    props.setpauid(ids);
    props.setshowpay(false);
  }

  return (
    <div className="fixed z-50 flex content-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between bg-green-500 w-72 p-2">
          <div className="text-white text-2xl font-semibold">Choose payer</div>
          <button className="text-white hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => props.setshowpay(false)}
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
        {payuser.map((item) => (
          <div
            onClick={() => submit(item.id, item.username)}
            className="flex gap-3 p-2 hover:bg-gray-200"
          >
            <img src={owed} alt="" className="rounded-full h-7 w-7" />
            <p className="my-auto">{item.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payusermenu;
