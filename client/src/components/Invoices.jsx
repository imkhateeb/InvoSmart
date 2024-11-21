import { FileArrowDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cols = [
  {
    title: "S/N",
    width: "5%",
  },
  {
    title: "Invoice No.",
    width: "12%",
  },
  {
    title: "Customer",
    width: "17%",
  },
  {
    title: "Product(s)",
    width: "23%",
  },
  {
    title: "Quantity",
    width: "10%",
  },
  {
    title: "Total Amount",
    width: "10%",
  },
  {
    title: "Tax",
    width: "5%",
  },
  {
    title: "Final Amount",
    width: "10%",
  },
  {
    title: "Date",
    width: "8%",
  },
];

const Invoices = () => {
  const { invoices } = useSelector((state) => state.invoices);
  // console.log(invoices);
  const [allInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    setAllInvoices(invoices);
  }, [invoices]);

  const searchInvoice = (e) => {
    const searchValue = e.target.value;
    const filteredInvoices = invoices.filter(
      (invoice) =>
        invoice?.customer?.customerName
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        invoice.invoiceNumber.toString().includes(searchValue)
    );
    if (filteredInvoices.length === 0) {
      setAllInvoices(invoices);
    } else {
      setAllInvoices(filteredInvoices);
    }
  };

  return (
    <div className="p-2 bg-white rounded-3xl w-full h-[79vh] flex flex-col">
      {allInvoices.length > 0 ? (
        <>
          <div className="p-3 border-b flex justify-between items-center">
            <input
              type="text"
              placeholder="Customer Name, Invoice..."
              className="p-2.5 border rounded-md w-[280px]"
              onChange={searchInvoice}
            />
            <FileArrowDown
              size={32}
              weight="fill"
              className="text-primaryColor cursor-pointer"
            />
          </div>

          <div className="flex-1 overflow-auto flex-col p-3 gap-5 min-w-[800px]">
            <div className="flex w-full mt-2 mb-4 py-2">
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
              {allInvoices.map((invoice, index) => (
                <div
                  key={index}
                  className="flex w-full p-2 pr-0 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <div style={{ width: cols[0].width }}>{index + 1}</div>
                  <div style={{ width: cols[1].width }}>
                    {invoice.invoiceNumber}
                  </div>
                  <div style={{ width: cols[2].width }}>
                    {invoice?.customer?.customerName || "N/A"}
                  </div>
                  <div
                    style={{ width: cols[3].width }}
                    className="overflow-x-auto flex gap-2 w-[95%]"
                  >
                    <div>
                      {invoice.products.map((product, index) => (
                        <div key={index} className="text-nowrap">
                          {product?.productName || "N/A"},
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: cols[4].width }}>
                    {invoice?.qty || 1}
                  </div>
                  <div style={{ width: cols[5].width }}>
                    {invoice?.amountBeforeTax || "N/A"}
                  </div>
                  <div style={{ width: cols[6].width }}>
                    {invoice?.tax || "0%"}
                  </div>
                  <div style={{ width: cols[7].width }}>
                    {invoice?.amountAfterTax ||
                      invoice?.amountBeforeTax ||
                      "N/A"}
                  </div>
                  <div style={{ width: cols[8].width }}>
                    {invoice?.date || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xl font-semibold text-primaryColor">
          No Invoice found.
        </div>
      )}
    </div>
  );
};

export default Invoices;
