import { FileArrowDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cols = [
  {
    title: "S. No",
    width: "8%",
  },
  {
    title: "Customer Name",
    width: "22%",
  },
  {
    title: "Product Name",
    width: "25%",
  },
  {
    title: "Quantity",
    width: "10%",
  },
  {
    title: "Tax",
    width: "10%",
  },
  {
    title: "Total",
    width: "10%",
  },
  {
    title: "Date",
    width: "15%",
  },
];

const Invoices = () => {
  const { invoices } = useSelector((state) => state.invoices);

  const [allInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    setAllInvoices(invoices);
  }, [invoices]);

  const searchInvoice = (e) => {
    const searchValue = e.target.value;
    const filteredInvoices = invoices.filter(
      (invoice) =>
        invoice.customerName
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        invoice.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setAllInvoices(filteredInvoices);
  };

  console.log(allInvoices);

  return (
    <div className="p-4 bg-white rounded-3xl w-full h-full flex flex-col">
      {allInvoices.length > 0 ? (
        <>
          <div className="p-3 border-b flex justify-between items-center">
            <input
              type="text"
              placeholder="Customer, Product nae..."
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
                  className="flex w-full py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <div style={{ width: cols[0].width }}>
                    {invoice.serialNumber}
                  </div>
                  <div style={{ width: cols[1].width }}>
                    {invoice.customerName}
                  </div>
                  <div
                    style={{ width: cols[2].width }}
                    className="overflow-x-auto flex gap-2 w-[95%]"
                  >
                    <div>
                      {invoice.products.map((product, index) => (
                        <div key={index} className="text-nowrap">
                          {product.productName},
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: cols[3].width }}>{invoice.qty}</div>
                  <div style={{ width: cols[4].width }}>{invoice.tax}</div>
                  <div style={{ width: cols[5].width }}>
                    {invoice.totalAmount}
                  </div>
                  <div style={{ width: cols[6].width }}>{invoice.date}</div>
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
