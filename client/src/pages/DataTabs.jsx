import { useState } from "react";
import Invoices from "../components/Invoices";
import Products from "../components/Products";
import Customers from "../components/Customers";
import { Link } from "react-router-dom";
import { Calculator, Receipt, UsersThree } from "@phosphor-icons/react";
import { useSelector } from "react-redux";

const DataTabs = () => {
  const { invoices } = useSelector((state) => state.invoices);
  const { products } = useSelector((state) => state.products);
  const { customers } = useSelector((state) => state.customers);
  const tabs = [
    {
      title: "Invoices",
      Icon: (
        <Calculator size={32} weight="bold" className="text-primaryColor" />
      ),
      ActiveIcon: (
        <Calculator size={32} weight="fill" className="text-primaryColor" />
      ),
    },
    {
      title: "Products",
      Icon: <Receipt size={32} weight="bold" className="text-primaryColor" />,
      ActiveIcon: (
        <Receipt size={32} weight="fill" className="text-primaryColor" />
      ),
    },
    {
      title: "Customers",
      Icon: (
        <UsersThree size={32} weight="bold" className="text-primaryColor" />
      ),
      ActiveIcon: (
        <UsersThree size={32} weight="fill" className="text-primaryColor" />
      ),
    },
  ];
  const [currentTab, setCurrentTab] = useState("Invoices");

  return (
    <div className="flex gap-4 pt-6 pr-4 h-full w-full">
      <div className="h-full bg-white rounded-tr-3xl shadow-sm flex flex-col gap-4 p-2 md:p-4">
        <div className="py-2 md:border-b-[1px] w-[90%] mx-auto">
          <p className="text-lg font-semibold max-md:hidden">InvoSmart</p>
        </div>

        <div className="flex flex-col gap-1">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setCurrentTab(tab.title)}
              className={`py-3 px-4 max-md:px-3 cursor-pointer hover:bg-gray-100 rounded-lg ${
                currentTab === tab.title ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <div>
                  {currentTab === tab.title ? tab.ActiveIcon : tab.Icon}
                </div>
                <span className="max-md:hidden">{tab.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 h-full w-full">
        <div className="w-full flex justify-between">
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
          <div>
            {currentTab === "Invoices" && (
              <p className="text-md text-gray-500 font-semibold">
                {invoices.length} Invoices
              </p>
            )}
            {currentTab === "Products" && (
              <p className="text-md text-gray-500 font-semibold">
                {products.length} Products
              </p>
            )}
            {currentTab === "Customers" && (
              <p className="text-md text-gray-500 font-semibold">
                {customers.length} Customers
              </p>
            )}
          </div>
        </div>

        {currentTab === "Invoices" && <Invoices />}
        {currentTab === "Products" && <Products />}
        {currentTab === "Customers" && <Customers />}
      </div>
    </div>
  );
};

export default DataTabs;
