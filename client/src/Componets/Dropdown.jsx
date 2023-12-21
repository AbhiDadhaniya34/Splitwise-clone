import { useEffect, useState } from "react";
import owed from "../image/owed.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setdata] = useState();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:1200/loginuser/${id}`).then((response) => {
      setdata(response.data[0].username);
    });
  }, [id]);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <div className="flex gap-2 mt-1">
            <img src={owed} alt="" className="w-5 h-5 rounded-full my-auto" />
            <p className="my-auto text-white">{data}</p>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <a
              href="/addgroup"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Create a group
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
