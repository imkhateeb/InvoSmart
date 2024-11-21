import { FileArrowDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomerModal from "./CustomerModal";
import * as XLSX from "xlsx";

const cols = [
  { title: "S/N", width: "8%" },
  { title: "Customer Name", width: "20%" },
  { title: "Email", width: "20%" },
  { title: "Phone", width: "15%" },
  { title: "Purchase Amount", width: "15%" },
  { title: "Address", width: "22%" },
];

const Customers = () => {
  const { customers } = useSelector((state) => state.customers);
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setAllCustomers(customers);
  }, [customers]);

  const searchCustomers = (e) => {
    const searchValue = e.target.value;
    const filteredCustomers = customers.filter((customer) =>
      customer.customerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setAllCustomers(
      filteredCustomers.length === 0 ? customers : filteredCustomers
    );
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer({ ...customer });
  };

  const closeModal = () => {
    setSelectedCustomer(null);
  };

  const downloadExcel = () => {
    // Prepare the data for Excel
    const data = allCustomers.map((customer, index) => ({
      "S/N": index + 1,
      "Customer Name": customer.customerName || "N/A",
      Email: customer.customerEmail || "N/A",
      Phone: customer.customerPhone || "N/A",
      "Purchase Amount": customer.totalPurchaseAmount || 0,
      Address: customer.customerAddress || "N/A",
    }));

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // Download the workbook as an Excel file
    XLSX.writeFile(workbook, "Customers.xlsx");
  };

  return (
    <div className="p-2 bg-white rounded-3xl w-full h-[79vh] flex flex-col">
      {allCustomers.length > 0 ? (
        <>
          <div className="p-3 border-b flex justify-between items-center">
            <input
              type="text"
              placeholder="Customer Name..."
              className="p-2.5 border rounded-md w-[280px]"
              onChange={searchCustomers}
            />
            <FileArrowDown
              size={32}
              weight="fill"
              className="text-primaryColor cursor-pointer"
              onClick={downloadExcel} // Attach the download handler
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
              {allCustomers.map((customer, index) => (
                <div
                  className="flex w-full p-2 pr-0 hover:bg-gray-100 rounded-md cursor-pointer"
                  key={index}
                  onClick={() => handleRowClick(customer)}
                >
                  <div style={{ width: cols[0].width }}>
                    {customer?.customerId || index + 1}
                  </div>
                  <div style={{ width: cols[1].width }}>
                    {customer?.customerName || "N/A"}
                  </div>
                  <div style={{ width: cols[2].width }}>
                    {customer?.customerEmail || "N/A"}
                  </div>
                  <div style={{ width: cols[3].width }}>
                    {customer?.customerPhone || "N/A"}
                  </div>
                  <div style={{ width: cols[4].width }}>
                    {customer?.totalPurchaseAmount || 0}
                  </div>
                  <div style={{ width: cols[5].width }}>
                    {customer?.customerAddress || "N/A"}
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

      {/* Modal for editing customer details */}
      {selectedCustomer && (
        <CustomerModal customer={selectedCustomer} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Customers;
