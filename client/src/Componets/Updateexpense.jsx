import { useEffect, useState } from "react";
import bill from "../image/bill.png";
import axios from "axios";
import Updatepaymenu from "../Componets/Updatepaymenu";
import Updatesplitoption from "./Updatesplitoption";

function Updateexpense(props) {
  const [users, setusers] = useState([]);
  const [amount, setamount] = useState();
  const [description, setdescription] = useState();
  const [date, setdate] = useState();
  const [groupid, setgroupid] = useState();
  const [payid, setpayid] = useState();
  const [owedid, setowedid] = useState();
  const [owedamount, setowedamount] = useState();
  const [show, setshow] = useState();
  const [payusers, setpayusers] = useState();
  const [payuserid, setpayuserid] = useState();
  const [showsplit, setshowsplit] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:1200/payuser/${props.id}`).then((result) => {
      setpayid(result.data[0].userid);
      setpayuserid(result.data[0].username);
      axios
        .get(`http://localhost:1200/username/${result.data[0].userid}`)
        .then((response) => {
          setpayusers(response.data[0].username);
        });
    });

    axios.get(`http://localhost:1200/oweduser/${props.id}`).then((result) => {
      setowedid(result.data[0].userid);
      setowedamount(result.data[0].amount);
    });

    axios
      .get(`http://localhost:1200/expensebyid/${props.id}`)
      .then((result) => {
        setamount(result.data[0].amount);
        setdescription(result.data[0].description);
        setdate(result.data[0].date);
        setgroupid(result.data[0].groupid);
      });

    axios.get("http://localhost:1200/alluser").then((response) => {
      setusers(response.data);
    });
  }, [props.id]);

  function submit() {
    axios.put(`http://localhost:1200/updateexpense/${props.id}`, {
        date,
        description,
        amount,
        groupid,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    props.setupdateopen(false);
  }

  function pay() {
    setshow(true);
  }

  return (
    <div className="fixed inset-0 flex items-center gap-5 justify-center z-50 bg-black bg-opacity-50">
      <div className="flex gap-5">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex justify-between bg-green-500 p-2">
            <div className="text-white text-2xl font-semibold">
              Edit expense
            </div>
            <button className="text-white hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => props.setupdateopen(false)}
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
                  value={payid}
                  onChange={(e) => setpayid(e.target.value)}
                >
                  {users.map((item) => (
                    <option value={item.id}>{item.username}</option>
                  ))}
                </select>
              </span>
              and
              <span>
                <select
                  value={owedid}
                  onChange={(e) => setowedid(e.target.value)}
                >
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
                className="mb-1 h-10 w-40 border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                placeholder="Enter a description"
              />
              <div>
                <span className="text-2xl my-auto">₹</span>
                <input
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  type="integer"
                  className="mt-1 h-10 w-36 border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
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
            and split
            <button
              onClick={() => setshowsplit(true)}
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
                type="date"
                className="border border-gray-300 px-2 py-1 focus:outline-none focus:border-blue-500"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            </div>
            {/* <button className="bg-gray-200 py-2 px-8 rounded-md">
               {groupname} 
            </button> */}
          </div>

          <div className="mt-5 flex gap-3 justify-end border-t-2 p-3">
            <button className="bg-gray-200 px-4 py-2">Cancel</button>
            <button className="bg-green-500 px-4 py-2" onClick={submit}>
              Save
            </button>
          </div>
        </div>
        <div>
          {show && (
            <Updatepaymenu
              setshow={setshow}
              setpayusers={setpayusers}
              setpayid={setpayuserid}
            />
          )}
          {showsplit && (
            <Updatesplitoption
              setowedid={setowedid}
              setowedamount={setowedamount}
              payid={payid}
              owedid={owedid}
              setshowsplit={setshowsplit}
              amount={amount}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Updateexpense;
