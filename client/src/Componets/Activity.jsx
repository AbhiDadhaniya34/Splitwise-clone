import { useEffect, useState } from "react";
import bill from "../image/bill.png";
import axios from "axios";
import { useParams } from "react-router-dom";

function Activity() {
  const [data, setdata] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:1200/getactivity/${id}`).then((response) => {
      setdata(response.data.slice(0, 6));
      console.log(response.data);
    });
  }, [id]);

  return (
    <>
      <div className="flex justify-between bg-gray-200 p-2">
        <div className="flex gap-1">
          <p className="my-auto font-semibold text-2xl">Recent activity</p>
        </div>
      </div>
      {data.map((item) => (
        <div className="p-5 flex gap-5 border-b">
          <img src={bill} alt="" className="h-10 w-10" />
          <div>
            <p className="">
              <span className="font-semibold">You </span>
              {item.type} <span>"{item.description}"</span>.
            </p>
            <p className="text-xs text-gray-400">{item.date}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Activity;
