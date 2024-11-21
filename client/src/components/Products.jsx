import { FileArrowDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "./ProductModal";
import * as XLSX from "xlsx";

const cols = [
  { title: "S/N", width: "5%" },
  { title: "Product Name", width: "25%" },
  { title: "Quantity", width: "10%" },
  { title: "Unit Price", width: "10%" },
  { title: "Total Price", width: "10%" },
  { title: "Tax", width: "10%" },
  { title: "After Tax", width: "10%" },
  { title: "Discount", width: "10%" },
  { title: "Final Price", width: "10%" },
];

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const searchProducts = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue)
    );
    setAllProducts(filteredProducts.length ? filteredProducts : products);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const saveProductName = (newName) => {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: { ...selectedProduct, productName: newName },
    });
    closeModal();
  };

  const downloadExcel = () => {
    // Prepare the data for Excel
    const data = allProducts.map((product, index) => ({
      "S/N": index + 1,
      "Product Name": product.productName || "N/A",
      Quantity: product.quantity || "N/A",
      "Unit Price": product.unitPrice || "N/A",
      "Total Price": product.totalPrice || "N/A",
      Tax: product.tax || "0%",
      "After Tax": product.priceAfterTax || "N/A",
      Discount: product.discount || "0%",
      "Final Price":
        product.priceAfterDiscount || product.priceAfterTax || "N/A",
    }));

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Save the workbook to a file
    XLSX.writeFile(workbook, "products.xlsx");
  };

  return (
    <div className="p-2 bg-white rounded-3xl w-full h-[79vh] flex flex-col">
      {allProducts.length > 0 ? (
        <>
          <div className="p-3 border-b flex justify-between items-center">
            <input
              type="text"
              placeholder="Product name..."
              className="p-2.5 border rounded-md w-[280px]"
              onChange={searchProducts}
            />
            <FileArrowDown
              size={32}
              weight="fill"
              className="text-primaryColor cursor-pointer"
              onClick={downloadExcel} // Attach the download handler
            />
          </div>
          <p className="text-sm font-semibold text-primaryColor">
            Note: Click on a row to edit Product name.(It will update the
            invoice also)
          </p>
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
              {allProducts.map((product, index) => (
                <div
                  className="flex w-full py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                  key={index}
                  onClick={() => openModal(product)}
                >
                  <div className="px-2" style={{ width: cols[0].width }}>
                    {index + 1}
                  </div>
                  <div style={{ width: cols[1].width }}>
                    {product.productName || "N/A"}
                  </div>
                  <div style={{ width: cols[2].width }}>
                    {product.quantity || "N/A"}
                  </div>
                  <div style={{ width: cols[3].width }}>
                    {product.unitPrice || "N/A"}
                  </div>
                  <div style={{ width: cols[4].width }}>
                    {product.totalPrice || "N/A"}
                  </div>
                  <div style={{ width: cols[5].width }}>
                    {product.tax || "0%"}
                  </div>
                  <div style={{ width: cols[6].width }}>
                    {product.priceAfterTax || "N/A"}
                  </div>
                  <div style={{ width: cols[7].width }}>
                    {product.discount || "0%"}
                  </div>
                  <div style={{ width: cols[8].width }}>
                    {product.priceAfterDiscount ||
                      product.priceAfterTax ||
                      "N/A"}
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
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          onSave={saveProductName}
        />
      )}
    </div>
  );
};

export default Products;
