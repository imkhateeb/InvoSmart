import { useState } from "react";
import Invoices from "../components/Invoices";
import Products from "../components/Products";
import Customers from "../components/Customers";
import { Link } from "react-router-dom";

const DataTabs = () => {
  const tabs = ["Invoices", "Products", "Customers"];
  const [currentTab, setCurrentTab] = useState("Invoices");

  return (
    <div className="flex gap-4 pt-6 pr-4 h-full w-full">
      <div className="h-full w-[250px] bg-white rounded-tr-3xl shadow-sm flex flex-col gap-4">
        <div className="p-4 border-b-[1px] w-[90%] mx-auto">
          <p>InvoSmart</p>
        </div>

        <div className="flex flex-col gap-1">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setCurrentTab(tab)}
              className={`py-3 px-4 w-[90%] mx-auto cursor-pointer hover:bg-gray-100 rounded-lg ${
                currentTab === tab ? "bg-gray-100" : ""
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 h-full w-full">
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold text-primaryColor">
            {currentTab}
          </p>
          <Link
            to={"/data/process"}
            className="bg-primaryColor text-white px-3 py-1 rounded-lg"
          >
            Add New
          </Link>
        </div>

        {currentTab === "Invoices" && <Invoices />}
        {currentTab === "Products" && <Products />}
        {currentTab === "Customers" && <Customers />}
      </div>
    </div>
  );
};

export default DataTabs;
