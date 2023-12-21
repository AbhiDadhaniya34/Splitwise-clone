import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Dashboard() {
  let { id } = useParams();
  const pay = [];
  const owed = [];
  const [payamount, setpayamount] = useState(0);
  const [owedamount, setowedamount] = useState(0);
  useEffect(() => {
    const payuser = [];
    const oweduser = [];
    calculate();
    async function calculate() {
      const response = await axios.get(
        `http://localhost:1200/getuserpay/${id}`
      );
      payuser.push(...response.data);
      const result = await axios.get(`http://localhost:1200/getuserowed/${id}`);
      oweduser.push(...result.data);

      for (let i of payuser) {
        pay.push(Number(i.amount));
      }
      for (let i of oweduser) {
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
  }, [id, pay, owed]);

  const balance = payamount - owedamount;
  const colorClass = balance < 0 ? "text-red-500" : "text-teal-500";

  return (
    <div className="grid grid-cols-3 justify-center  bg-gray-200 border-t-2 border-gray-100">
      <div className="text-center border-r-2 border-gray-100 p-2">
        <p className="text-xs text-gray-400">total balance</p>
        <p className={`text-sm ${colorClass}`}>${balance}.00</p>
      </div>
      <div className="text-center border-r-2 border-gray-100 p-2">
        <p className="text-xs text-gray-400">you owe</p>
        <p className="text-red-500 text-sm">${owedamount}.00</p>
      </div>
      <div className="text-center p-2">
        <p className="text-xs text-gray-400 ">you are owed</p>
        <p className="text-teal-500 text-sm">${payamount}.00</p>
      </div>
    </div>
  );
}

export default Dashboard;
