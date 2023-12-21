import logo from "../image/Splitwise.svg";
import Dropdown from "./Dropdown";

function Head() {
  return (
    <div className="bg-teal-400">
      <div className="grid grid-cols-[0.5fr,1fr,0.5fr]">
        <div className="">
          <div className="flex justify-end px-3.5">
            <img src={logo} alt="logo" className="h-8 w-24 my-auto" />
          </div>
        </div>
          <div></div>
        <div>
          <Dropdown />
        </div>
      </div>
    </div>
  );
}

export default Head;
