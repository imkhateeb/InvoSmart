import { FileArrowDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const cols = [
  {
    title: "Product Name",
    width: "25%",
  },
  {
    title: "Quantity",
    width: "15%",
  },
  {
    title: "Unit Price",
    width: "15%",
  },
  {
    title: "Tax",
    width: "15%",
  },
  {
    title: "Discount",
    width: "15%",
  },
  {
    title: "Total Price",
    width: "15%",
  },
];

const Products = () => {
  const { products } = useSelector((state) => state.products);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const searchProducts = (e) => {
    const searchValue = e.target.value;
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setAllProducts(filteredProducts);
  };
  return (
    <div className="p-4 bg-white rounded-3xl w-full h-full flex flex-col">
      {allProducts.length > 0 ? (
        <>
          <div className="p-3 border-b flex justify-between items-center">
            <input
              type="text"
              placeholder="Customer, Product nae..."
              className="p-2.5 border rounded-md w-[280px]"
              onChange={searchProducts}
            />
            <FileArrowDown
              size={32}
              weight="fill"
              className="text-primaryColor cursor-pointer"
            />
          </div>

          <div className="flex-1 overflow-auto flex-col w-full p-3">
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
              {allProducts.map((invoice, index) => (
                <div
                  className="flex w-full py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  key={index}
                >
                  <div style={{ width: cols[0].width }}>
                    {invoice.productName}
                  </div>
                  <div style={{ width: cols[1].width }}>{invoice.quantity}</div>
                  <div style={{ width: cols[2].width }}>
                    {invoice.unitPrice}
                  </div>
                  <div style={{ width: cols[3].width }}>{invoice.tax}</div>
                  <div style={{ width: cols[4].width }}>
                    {invoice.discount || "N/A"}
                  </div>
                  <div style={{ width: cols[5].width }}>
                    {invoice.priceWithTax}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-xl font-semibold text-primaryColor">
          No Product found.
        </div>
      )}
    </div>
  );
};

export default Products;
