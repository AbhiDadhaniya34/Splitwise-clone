import menu from "../image/icons8-menu-50.png";
import calender from "../image/calendar.png";
import message from "../image/message.png";
import trend from "../image/trend.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function End(props) {
  const [value, setvalue] = useState("option1");
  const [payamount, setpayamount] = useState(0);
  const [owedamount, setowedamount] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    const pay = [];
    const owed = [];
    const paysers = [];
    const oweduser = [];
    calculate();
    async function calculate() {
      for (const item of props.expense) {
        const response = await axios.get(
          `http://localhost:1200/payuser/${item.id}`
        );
        paysers.push(...response.data);
        const result = await axios.get(
          `http://localhost:1200/oweduser/${item.id}`
        );
        oweduser.push(...result.data);
      }

      const paydata = paysers.filter((item) => item.userid === id);
      const oweddata = oweduser.filter((item) => item.userid === id);

      for (let i of paydata) {
        pay.push(Number(i.amount));
      }
      for (let i of oweddata) {
        owed.push(Number(i.amount));
      }

      const paygrandTotal = pay.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      const owedgrandTotal = owed.reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setpayamount(paygrandTotal);
      setowedamount(owedgrandTotal);
    }
  }, [id, props.expense]);
  const balance = payamount - owedamount;
  const colorClass = balance < 0 ? "text-red-500" : "text-teal-500";
  let content;
  switch (value) {
    case "option1":
      content = (
        <div className="w-40 mt-3 ml-5">
          <p className="text-sm text-gray-300 font-semibold">YOUR BALANCE</p>
          <p className={`${colorClass}`}>₹{balance}.00</p>
        </div>
      );
      break;
    case "option2":
      content = (
        <div className="w-40 mt-3 ml-5">
          <p className="text-sm text-gray-300 font-semibold">
            UPCOMING EXPENSES
          </p>
          <p className="text-sm mt-1">
            You have not added any recurring expenses yet
          </p>
        </div>
      );
      break;
    case "option3":
      content = (
        <div className="w-40 mt-3 ml-5">
          <p className="text-sm text-gray-400 font-semibold">WHITEBOARD </p>
          <textarea
            defaultValue={"Click here to edit the whiteboard!"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
          />
          <p className="text-sm">
            Use the whiteboard to remember important info, like your landlord’s
            address or emergency contact info.
          </p>
        </div>
      );
      break;

    case "option4":
      content = (
        <div className="w-40 mt-3 ml-5">
          <p className="text-gray-400 font-semibold text-sm">
            TRENDS THIS MONTH
          </p>
          <div className="my-2">
            <p className="font-bold text-sm">Total you paid for</p>
            <p className="text-sm text-teal-400 ">₹{payamount}.00</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Your total share</p>
            <p className="text-sm text-red-400">₹{owedamount}.00</p>
          </div>
          <div className="my-2">
            <p className="font-semibold text-sm">Payments made</p>
            <p className="text-sm text-gray-400">₹0.00</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Payments received</p>
            <p className="text-sm text-gray-400">₹0.00</p>
          </div>
          <div className="my-2">
            <p className="font-semibold text-sm">Total change in balance</p>
            <p className={`text-sm ${colorClass}`}>₹{balance}.00</p>
          </div>
        </div>
      );
      break;
    default:
      content = <div>Default Option</div>;
      break;
  }

  return (
    <div>
      <div className="flex gap-2 mt-3 ml-5">
        <img
          src={menu}
          alt=""
          className="h-7 w-7  p-1 hover:bg-gray-200 border-2 rounded-md"
          onClick={() => setvalue("option1")}
        />
        <img
          src={calender}
          alt=""
          className="h-7 w-7  p-1 hover:bg-gray-200 border-2 rounded-md"
          onClick={() => setvalue("option2")}
        />
        <img
          src={message}
          alt=""
          className="h-7 w-7  p-1 hover:bg-gray-200 border-2 rounded-md"
          onClick={() => setvalue("option3")}
        />
        <img
          src={trend}
          alt=""
          className="h-7 w-7  p-1 hover:bg-gray-200 border-2 rounded-md"
          onClick={() => setvalue("option4")}
        />
      </div>
      {content}
    </div>
  );
}

export default End;
