import axios from "axios";
import fimg from "../image/friend.png";
import gimg from "../image/group.png";
import Addfriend from "../Componets/Addfriend";
import Addexpense from "./Addexpense";
import all from "../image/all.png";
import activity from "../image/activity.png";
import dash from "../image/dash.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Sidebar(props) {
  const [group, setgroup] = useState([]);
  const [friend, setfriend] = useState([]);
  const [groupid, setgroupid] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:1200/allgroup").then((response) => {
      setgroup(response.data);
    });
    axios.get("http://localhost:1200/alluser").then((response) => {
      setfriend(response.data);
    });
  }, []);

  async function getdata(id, name) {
    props.setpaid(id);
    props.sethome(true);
    props.setdopen(false);
    props.setgroupname(name);
    axios.get(`http://localhost:1200/back/${id}`).then((response) => {
      props.setexpense(response.data);
    });
  }

  function dashboard() {
    props.setshowactivity(true);
    props.setgroupname("Dashboard");
    props.setdopen(true);
  }

  function click(id, name) {
    props.setshowactivity(true);
    props.setgroupname(name);
    props.setdopen(false);
    props.sethome(true);
    setgroupid(id);
    axios.get(`http://localhost:1200/getexpense/${id}`).then((response) => {
      props.setexpense(response.data);
    });
  }
  function ex() {
    props.setshowactivity(true);
    props.setdopen(false);
    axios.get("http://localhost:1200/allexpense").then((response) => {
      props.setexpense(response.data);
    });
    props.setgroupname("Allexpenses");
    props.sethome(true);
  }

  return (
    <>
      {props.open && (
        <Addfriend setopen={props.setopen} setfriend={setfriend} />
      )}
      {props.closed && (
        <Addexpense
          setexpense={props.setexpense}
          setclosed={props.setclosed}
          groupname={props.groupname}
          groupid={groupid}
        />
      )}
      <div className="flex justify-end mx-5">
        <div className="mt-2">
          <div className="flex gap-1  p-1 hover:bg-gray-200">
            <img src={dash} alt="logo" className="w-5 h-4 my-auto " />
            <button onClick={dashboard} className={`text-1xl`}>
              Dashboard
            </button>
          </div>
          <div className="flex gap-1 p-1 hover:bg-gray-200">
            <img src={activity} alt="logo" className="w-5 h-4 my-auto " />
            <button
              onClick={() => props.setshowactivity(false)}
              className="text-1xl active:text-green-400"
            >
              Recent activity
            </button>
          </div>
          <div className="flex gap-1 p-1 hover:bg-gray-200">
            <img src={all} alt="logo" className="w-5 h-4 my-auto " />
            <button onClick={ex} className="text-1xl active:text-green-400">
              Allexpenses
            </button>
          </div>
          <div className="p1 bg-gray-200 flex justify-between hover:bg-gray-200">
            <p className="text-gray-400">GROUPS</p>
            <a
              href={`/addgroup/${id}`}
              className="text-gray-400 active:text-green-400"
            >
              +add
            </a>
          </div>
          <div className="mt-2 mb-1">
            {group.map((item) => (
              <div
                className="flex gap-1 p-1 hover:bg-gray-200"
                key={item.id}
                onClick={() => click(item.id, item.groupname)}
              >
                <img src={gimg} alt="logo" className="w-5 h-5" />
                {item.groupname}
              </div>
            ))}
          </div>
          <div className="p1 bg-gray-200 flex justify-between  hover:bg-gray-200">
            <p className="text-gray-400">FRIENDS</p>
            <button
              className="text-gray-400 active:text-green-400"
              onClick={() => props.setopen(true)}
            >
              +add
            </button>
          </div>
          <div className="mt-2">
            {friend.map((item) => (
              <div
                className="flex gap-1 p-1 hover:bg-gray-200"
                key={item.id}
                onClick={() => getdata(item.id, item.username)}
              >
                <img src={fimg} alt="logo" className="w-5 h-5" />
                {item.username}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
