import { invoSmartLogo } from "../assets/images";

const Navbar = () => {
  return (
    <div className="flex justify-between p-4 bg-white shadow-sm items-center">
      <div className="flex gap-2 items-center">
        <div>
          <img
            src={invoSmartLogo}
            alt="InvoSmart Logo"
            className="w-[45px] h-[45px] rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-primaryColor">InvoSmart</p>
          <p className="text-sm font-semibold text-gray-400">
            Automate Data Seamlessly.
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
