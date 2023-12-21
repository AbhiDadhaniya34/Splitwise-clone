import { useState } from "react";
import End from "../Componets/End";
import Head from "../Componets/Head";
import Middle from "../Componets/Middle";
import Sidebar from "../Componets/Sidebar";

function Home() {
  const [closed, setclosed] = useState(false);
  const [open, setopen] = useState(false);
  const [groupname, setgroupname] = useState("Dashboard");
  const [expense, setexpense] = useState([]);
  const [home, sethome] = useState(false);
  const [paid, setpaid] = useState();
  const [dopen, setdopen] = useState(true);
  const [showactivity, setshowactivity] = useState(true);

  return (
    <>
      <Head />
      <div className="grid grid-cols-[0.65fr,1fr,0.65fr]">
        <Sidebar
          setdopen={setdopen}
          setgroupname={setgroupname}
          groupname={groupname}
          closed={closed}
          setclosed={setclosed}
          setopen={setopen}
          open={open}
          setexpense={setexpense}
          sethome={sethome}
          setpaid={setpaid}
          setshowactivity={setshowactivity}
        />
        <div className="shadow-2xl h-screen">
          <Middle
            setclosed={setclosed}
            setopen={setopen}
            groupname={groupname}
            expense={expense}
            setexpense={setexpense}
            home={home}
            sethome={sethome}
            setpaid={setpaid}
            dopen={dopen}
            showactivity={showactivity}
          />
        </div>
        <End expense={expense} paid={paid} />
      </div>
    </>
  );
}

export default Home;
