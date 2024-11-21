import { Link } from "react-router-dom";
import { CloudCheck, Invoice } from "@phosphor-icons/react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-2 px-5 max-sm:px-3 bg-white shadow-sm items-center">
      <div className="flex gap-2 items-center">
        <Link to={"/"}>
          <Invoice size={55} weight="duotone" className="text-primaryColor" />
        </Link>
        <div className="flex flex-col">
          <Link to={"/"} className="text-lg font-semibold text-primaryColor">
            InvoSmart
          </Link>
          <p className="text-sm font-semibold text-gray-400">
            Powered By Swipe.
          </p>
        </div>
      </div>
      <Link to={"/data/tabs"}>
        <CloudCheck size={32} weight="fill" className="text-primaryColor" />
      </Link>
    </div>
  );
};

export default Navbar;
