import { useEffect, useState } from "react";
import bill from "../image/bill.png";
import axios from "axios";
import Payusermenu from "./Paymenu";
import Splitoption from "./Splitoption";
import { useParams } from "react-router-dom";

function Addexpense(props) {
  const [date, setSelectedDate] = useState();
  const [amount, setamount] = useState(0);
  const [description, setdescription] = useState();
  const [users, setusers] = useState([{}]);
  const [v2, setv2] = useState(1);
  const [userid, setuserid] = useState(1);
  const [showpay, setshowpay] = useState(false);
  const [payusers, setpayusers] = useState("abhi");
  const [payid, setpauid] = useState();
  const [showsplit, setshowsplit] = useState(false);
  const [owed, setowed] = useState();
  const [owedid, setowedid] = useState();

  const { id } = useParams();
  const type = "added";

  async function submit() {
    if (
      date == null ||
      amount == null ||
      description == null ||
      userid == null
    ) {
      return;
    }

    try {
      await axios.post("http://localhost:1200/insertexpense", {
        amount,
        date,
        description,
        groupid: props.groupid,
      });

      const response = await axios.get("http://localhost:1200/getexpenseid");
      const a = response.data[0].max;
      props.setclosed(false);

      await axios.post("http://localhost:1200/insertexpenseuser", {
        expenseid: a,
        userid: userid,
      });
      await axios.post("http://localhost:1200/insertexpenseuser", {
        expenseid: a,
        userid: v2,
      });
      await axios.post("http://localhost:1200/payuser", {
        expenseid: a,
        userid: payid,
        amount: amount,
      });
      await axios.post("http://localhost:1200/insertowed", {
        expenseid: a,
        userid: owedid,
        amount: owed,
      });
      await axios
        .get(`http://localhost:1200/getexpense/${props.groupid}`)
        .then((response) => {
          props.setexpense(response.data);
        });

      await axios.post("http://localhost:1200/insertactivity", {
        userid: id,
        type: type,
        description: description,
        date: date,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    axios.get("http://localhost:1200/alluser").then((response) => {
      setusers(response.data);
    });
  }, []);

  function pay() {
    setshowpay(true);
    setshowsplit(false);
  }

  function split() {
    setshowpay(false);
    setshowsplit(true);
  }

  return (
    <div className="fixed inset-0 flex items-center gap-5 justify-center z-50 bg-black bg-opacity-50">
      <div className="flex gap-5">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex justify-between bg-green-500 p-2">
            <div className="text-white text-2xl font-semibold">
              Add an expense
            </div>
            <button className="text-white hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => props.setclosed(false)}
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
          <div className="border-b-2 p-3">
            <label>
              With
              <span>
                <select
                  value={userid}
                  onChange={(e) => setuserid(e.target.value)}
                >
                  {users.map((item) => (
                    <option value={item.id}>{item.username}</option>
                  ))}
                </select>
              </span>
              and
              <span>
                <select value={v2} onChange={(e) => setv2(e.target.value)}>
                  {users.map((item) => (
                    <option value={item.id}>{item.username}</option>
                  ))}
                </select>
              </span>
            </label>
          </div>
          <div className="flex gap-5 mt-5 mb-5 justify-evenly p-4">
            <img src={bill} alt="" />
            <div className="my-auto">
              <input
                type="text"
                className="mb-1 h-10 w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Enter a description"
              />
              <div className="flex">
                <p className="text-2xl my-auto">₹</p>
                <input
                  onChange={(e) => setamount(e.target.value)}
                  type="integer"
                  className="mt-1 h-10 w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
                  placeholder="000"
                />
              </div>
            </div>
          </div>

          <p className="text-center">
            Paid by
            <span>
              <button
                className="m-2 px-1 text-teal-500 bg-gray-200 rounded-md"
                onClick={pay}
              >
                {payusers}
              </button>
            </span>
            and split{" "}
            <button
              onClick={split}
              className="m-2 px-1 text-teal-500 bg-gray-200 rounded-md"
            >
              equally​
            </button>
            .
          </p>
          <p className="text-center">({amount / 2}/person)</p>

          <div className="flex justify-evenly mt-3 ">
            <div className="bg-gray-200 px-2 py-2 rounded-md">
              <input
                className="p-1.5"
                type="date"
                value={date}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <button className="bg-gray-200 py-2 px-8 rounded-md">
              {props.groupname}
            </button>
          </div>

          <div className="mt-5 flex gap-3 justify-end border-t-2 p-3">
            <button className="bg-gray-200 px-4 py-2">Cancel</button>
            <button className="bg-green-500 px-4 py-2" onClick={submit}>
              Save
            </button>
          </div>
        </div>
        <div>
          {showpay && (
            <Payusermenu
              setshowpay={setshowpay}
              setpayusers={setpayusers}
              setpauid={setpauid}
            />
          )}
          {showsplit && (
            <Splitoption
              setowedid={setowedid}
              setowed={setowed}
              v2={v2}
              setshowsplit={setshowsplit}
              amount={amount}
              userid={userid}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Addexpense;
