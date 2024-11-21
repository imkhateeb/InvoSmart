import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-3xl">
        <div className="w-1/2 max-md:w-2/3 max-sm:w-4/5 animate-slight-up">
          <p className="text-xl font-semibold text-gray-500">
            {"India's Leading AI-Powered Invoice Manager."}
          </p>
          <p className="text-[50px] max-lg:text-[40px] max-md:text-[35px] max-sm:text-[25px] w-full font-bold">
            Automate, extract, and manage invoices with AI-powered precision and
            clarity.
          </p>
          <div className="flex justify-between w-full">
            <Link
              to={"/data/process"}
              className="flex gap-4 mt-5 items-center text-2xl bg-primaryColor text-white py-2 px-4 rounded-full hover:bg-primaryColor/95 transition-all duration-200 ease-in-out"
            >
              Try InvoSmart <ArrowUpRight weight="bold" />
            </Link>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
