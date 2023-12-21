import { useEffect, useState } from "react";
import equal from "../image/equal.svg";
import percentage from "../image/percentage.png";
import owed from "../image/owed.png";
import axios from "axios";

function Splitoption(props) {
  const [value, setvalue] = useState("option1");
  const [user1, setuser1] = useState([]);
  const [user2, setuser2] = useState([]);
  const [user1amount, setuser1amount] = useState();
  const [user2amount, setuser2amount] = useState();
  const [user1percentage, setuser1persentage] = useState();
  const [user2percentage, setuser2persentage] = useState();
  const [closed, setclosed] = useState(true);

  useEffect(() => {
    users();
    async function users() {
      await axios
        .get(`http://localhost:1200/username/${props.userid}`)
        .then((result) => {
          setuser1(result.data[0].username);
        });
      await axios
        .get(`http://localhost:1200/username/${props.v2}`)
        .then((result) => {
          setuser2(result.data[0].username);
        });
    }
  }, [props.userid, props.v2]);

  function equalcalculate(amt) {
    props.setowed(amt / 2);
    props.setowedid(props.v2);
    return amt / 2;
  }

  useEffect(() => {
    props.setowed(user2amount);
    props.setowedid(props.v2);
  }, [user2amount, props]);

  useEffect(() => {
    const total = (props.amount * +user2percentage) / 100;
    props.setowedid(props.v2);
    props.setowed(total);
  }, [user2percentage, props]);

  function singleamount() {
    props.setowed(props.amount);
    props.setowedid(props.v2);
    props.setshowsplit(false);
    setclosed(false);
  }

  function pay() {
    props.setowed(props.amount);
    props.setshowsplit(false);
    setclosed(false);
    props.setowedid(props.userid);
  }

  let content;
  switch (value) {
    case "option1":
      content = (
        <div className="m-3">
          <p className="font-bold text-lg">Split equally</p>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1">
              <img src={owed} alt="" className="rounded-full h-7 w-7 my-auto" />
              <p className="my-auto">{user1}</p>
            </div>
            <p className="my-auto">${equalcalculate(props.amount)}.00</p>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1">
              <img src={owed} alt="" className="rounded-full h-7 w-7 my-auto" />
              <p className="my-auto">{user2}</p>
            </div>
            <p className="my-auto">${equalcalculate(props.amount)}.00</p>
          </div>
        </div>
      );
      break;
    case "option2":
      content = (
        <div className="m-3">
          <p className="font-bold text-lg">Split by exact amounts</p>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1">
              <img src={owed} alt="" className="rounded-full h-7 w-7 my-auto" />
              <p className="my-auto">{user1}</p>
            </div>
            <div className="flex">
              <label className="bg-gray-200 px-2 py-1 rounded-sm border border-black ">
                ₹
              </label>
              <input
                onChange={(e) => setuser1amount(e.target.value)}
                className="w-16 border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1">
              <img src={owed} alt="" className="rounded-full h-7 w-7 my-auto" />
              <p className="my-auto">{user2}</p>
            </div>
            <div className="flex">
              <label className="bg-gray-200 px-2 py-1 rounded-sm border border-black ">
                ₹
              </label>
              <input
                onChange={(e) => setuser2amount(e.target.value)}
                className="w-16 border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="m-5 flex justify-between">
            <p className="text-sm font-semibold">TOTAL</p>
            <div>
              <p className="text-lg font-semibold">
                ₹{Number(user1amount) + Number(user2amount)}.00
              </p>
              <p className="text-xs">
                ₹{props.amount - (Number(user1amount) + Number(user2amount))}.00
                left
              </p>
            </div>
          </div>
        </div>
      );
      break;
    case "option3":
      content = (
        <div className="m-3">
          <p className="font-bold text-lg">Split by percentages</p>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1">
              <img src={owed} alt="" className="rounded-full h-7 w-7 my-auto" />
              <p className="my-auto">{user1}</p>
            </div>
            <div className="flex">
              <input
                onChange={(e) => setuser1persentage(e.target.value)}
                className="w-16 border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
              />
              <label className="bg-gray-200 px-1.5 py-1 rounded-sm border border-black ">
                %
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1">
              <img src={owed} alt="" className="rounded-full h-7 w-7 my-auto" />
              <p className="my-auto">{user2}</p>
            </div>
            <div className="flex">
              <input
                onChange={(e) => setuser2persentage(e.target.value)}
                className="w-16 border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
              />
              <label className="bg-gray-200 px-1.5 py-1 rounded-sm border border-black ">
                %
              </label>
            </div>
          </div>
          <div className="m-5 flex justify-between">
            <p className="text-sm font-semibold">TOTAL</p>
            <div>
              <p className="text-lg font-semibold">
                ₹{+user1percentage + +user2percentage}.00%
              </p>
              <p className="text-xs">
                ₹{100 - (+user1percentage + +user2percentage)}.00% left
              </p>
            </div>
          </div>
        </div>
      );
      break;

    default:
      content = <div>Default Option</div>;
      break;
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
              onClick={() => props.setshowsplit(false)}
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
        <div className=" mb-1 py-3 mx-5 grid gap-2 border-b-2">
          <button
            onClick={() => setclosed(true)}
            className="bg-teal-500 text-white rounded-xl text-sm p-0.5"
          >
            Split the expense
          </button>
          <button
            onClick={pay}
            className="bg-teal-500 text-white rounded-xl text-sm p-0.5"
          >
            {user1} owe the full amount
          </button>
          <button
            onClick={singleamount}
            className="bg-teal-500 text-white rounded-xl text-sm p-0.5"
          >
            {user2} owe the full amount
          </button>
        </div>
        {closed && (
          <div className="grid grid-cols-3 w-28 gap-2 mx-auto bg-gray-200 rounded-lg">
            <img
              onClick={() => setvalue("option1")}
              src={equal}
              alt=""
              className="my-auto w-8 h-8 border-r border-black"
            />
            <p
              onClick={() => setvalue("option2")}
              className="text-black w-8 h-8 bg-gray-200 border-r border-black"
            >
              1.23
            </p>
            <img
              onClick={() => setvalue("option3")}
              src={percentage}
              alt=""
              className="my-auto w-8 h-8 p-2"
            />
          </div>
        )}
        {closed && <div>{content}</div>}
      </div>
    </div>
  );
}

export default Splitoption;
