import { FileArrowDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cols = [
  {
    title: "Customer Name",
    width: "30%",
  },
  {
    title: "Phone Number",
    width: "30%",
  },
  {
    title: "Purchase Amount",
    width: "30%",
  },
];

const Customers = () => {
  const { customers } = useSelector((state) => state.customers);
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    setAllCustomers(customers);
  }, [customers]);

  const searchCustomers = (e) => {
    const searchValue = e.target.value;
    const filteredCustomers = customers.filter((customer) =>
      customer.customerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setAllCustomers(filteredCustomers);
  };

  return (
    <div className=" p-4 bg-white rounded-3xl w-full h-full flex flex-col">
      {allCustomers.length > 0 ? (
        <>
          <div className="p-3 border-b flex justify-between items-center">
            <input
              type="text"
              placeholder="Customer, Product nae..."
              className="p-2.5 border rounded-md w-[280px]"
              onChange={searchCustomers}
            />
            <FileArrowDown
              size={32}
              weight="fill"
              className="text-primaryColor cursor-pointer"
            />
          </div>

          <div className="flex-1 overflow-auto flex-col w-full p-3">
            <div className="flex w-full p-1">
              {cols.map((col, index) => (
                <div
                  className="font-semibold"
                  key={index}
                  style={{ width: col.width }}
                >
                  {col.title}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {allCustomers.map((cuatomer, index) => (
                <div
                  className="flex w-full py-2 px-1 hover:bg-gray-100 rounded-md cursor-pointer"
                  key={index}
                >
                  <div style={{ width: cols[0].width }}>
                    {cuatomer.customerName || "N/A"}
                  </div>
                  <div style={{ width: cols[1].width }}>
                    {cuatomer.customerPhone || "N/A"}
                  </div>
                  <div style={{ width: cols[2].width }}>
                    {cuatomer.totalPurchaseAmount || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xl font-semibold text-primaryColor">
          No Customer found.
        </div>
      )}
    </div>
  );
};

export default Customers;
