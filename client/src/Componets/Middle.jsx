import { useEffect, useState } from "react";
import logo from "../image/Splitwise.jpg";
import bill from "../image/bill.png";
import close from "../image/close.png";
import axios from "axios";
import paid from "../image/paid.png";
import owedi from "../image/owed.png";
import Updateexpense from "./Updateexpense";
import Dashboard from "./Dashboard";
import Activity from "./Activity";
import { useParams } from "react-router-dom";

function Middle(props) {
  const [amount, setamount] = useState();
  const [owedamounts, setowedamount] = useState();
  const [pay, setpay] = useState();
  const [owed, setowed] = useState();
  const [showexpense, setShowExpense] = useState(null);
  const [updateopen, setupdateopen] = useState(false);
  const [ids, setid] = useState();
  const { id } = useParams();
  const type = "Deleted";

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  async function remove(ide, description) {
    await axios.delete(`http://localhost:1200/removeexpense/${ide}`);
    await axios.post("http://localhost:1200/insertactivity", {
      userid: id,
      type: type,
      description: description,
      date: formattedDate,
    });
    const filtered = props.expense.filter((note) => note.id !== ide);
    props.setexpense(filtered);
  }

  function moredetails(id) {
    if (showexpense === id) {
      setShowExpense(null);
    } else {
      axios.get(`http://localhost:1200/expensebyid/${id}`).then((response) => {
        setShowExpense(id);
      });
    }
  }

  function update(id) {
    setupdateopen(!updateopen);
    setid(id);
  }

  useEffect(() => {
    async function fetchUsernames() {
      const amounts = {};
      const payuser = {};
      const owedamount = {};
      const oweduser = {};

      for (const item of props.expense) {
        try {
          const response = await axios.get(
            `http://localhost:1200/payuser/${item.id}`
          );
          amounts[item.id] = response.data[0].amount;
          const datas = await axios.get(
            `http://localhost:1200/username/${response.data[0].userid}`
          );
          payuser[item.id] = datas.data[0].username;

          const result = await axios.get(
            `http://localhost:1200/oweduser/${item.id}`
          );
          owedamount[item.id] = result.data[0].amount;
          const getdata = await axios.get(
            `http://localhost:1200/username/${result.data[0].userid}`
          );
          oweduser[item.id] = getdata.data[0].username;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setamount(amounts);
      setowedamount(owedamount);
      setpay(payuser);
      setowed(oweduser);
    }

    fetchUsernames();
  }, [props.expense]);

  return (
    <>
      {updateopen && <Updateexpense id={ids} setupdateopen={setupdateopen} />}
      {props.showactivity ? (
        <div>
          <div className="flex justify-between bg-gray-200 p-2">
            <div className="flex gap-1">
              <img src={logo} alt="item" className="w-9 h-9 rounded-full" />
              <p className="my-auto font-semibold text-2xl">
                {props.groupname}
              </p>
            </div>
            <div className="my-auto flex gap-2">
              <button
                onClick={() => props.setclosed(true)}
                className="bg-orange-500 rounded-md p-1 text-white"
              >
                Add an expense
              </button>
              <button className="bg-teal-400 rounded-md p-1 text-white">
                Settle up
              </button>
            </div>
          </div>
          {props.dopen ? (
            <Dashboard />
          ) : (
            <>
              {props.expense.map((item) => (
                <div key={item.id}>
                  <div
                    onClick={() => moredetails(item.id)}
                    className="p-2 grid grid-cols-2 justify-between mt-2 border-b-2 hover:bg-gray-100"
                  >
                    <div className="flex gap-3">
                      <div className="my-auto">{item.date}</div>
                      <img
                        src={bill}
                        alt="bill"
                        className="my-auto w-10 h-10"
                      />
                      <div className="my-auto">{item.description}</div>
                    </div>
                    <div className="grid grid-cols-[1fr,1fr,0.5fr] gap-2">
                      <div>
                        <p className="text-center text-xs text-gray-400">
                          {pay[item.id]} paid
                        </p>
                        <p className="text-end text-xl">
                          ₹{amount[item.id]}.00
                        </p>
                      </div>
                      <div>
                        <p className="text-center text-xs text-gray-400">
                          {pay[item.id]} lent {owed[item.id]}
                        </p>
                        <p className="text-center text-xl">
                          ₹{owedamounts[item.id]}
                        </p>
                      </div>
                      <div className="flex justify-end content-end">
                        <img
                          onClick={() => remove(item.id, item.description)}
                          src={close}
                          alt="close"
                          className=" hover:border-b-2 border-red-400 h-5 w-5 my-auto"
                        />
                      </div>
                    </div>
                  </div>
                  {showexpense === item.id && (
                    <div className="m-5">
                      <div className=" flex gap-2 border-b-2">
                        <img
                          src={bill}
                          alt="bill"
                          className="my-auto w-20 h-20"
                        />
                        <div>
                          <p className="font-semibold">{item.description}</p>
                          <p className="font-semibold">₹{amount[item.id]}</p>
                          <p className="text-gray-400 text-xs">
                            Added on {item.date}
                          </p>
                          <button
                            onClick={() => update(item.id)}
                            className="bg-orange-500 text-xs rounded-md p-1 mb-3 mt-2 text-white"
                          >
                            Edit expense
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-5">
                        <img
                          src={paid}
                          alt=""
                          className="rounded-full h-10 w-10"
                        />
                        <p className="my-auto">
                          ₹{pay[item.id]} paid ₹{amount[item.id]}.00 and owes ₹
                          {owedamounts[item.id]}.00
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <img
                          src={owedi}
                          alt=""
                          className="rounded-full h-10 w-10"
                        />
                        <p>
                          {owed[item.id]} owes ₹{owedamounts[item.id]}.00
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <Activity />
      )}
    </>
  );
}
export default Middle;
