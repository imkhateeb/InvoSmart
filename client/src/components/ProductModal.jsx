import { useState } from "react";
import { editProduct } from "../redux/reducers/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { updateInvoiceProduct } from "../redux/reducers/invoicesReducer";

const ProductModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [productName, setProductName] = useState(product.productName);

  const { invoices } = useSelector((state) => state.invoices);

  const handleSave = () => {
    const updatedProduct = { ...product, productName };
    dispatch(editProduct(updatedProduct));
    dispatch(updateInvoiceProduct({ invoices, updatedProduct }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-md transform transition-transform duration-300">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <label className="block text-sm font-medium mb-2">Product Name</label>
        <input
          type="text"
          className="w-full p-2.5 border rounded-md"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primaryColor text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
