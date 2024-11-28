import React, { useState } from "react";
import { editCustomer } from "../redux/reducers/customersReducer";
import { useDispatch, useSelector } from "react-redux";
import { updateInvoiceCustomer } from "../redux/reducers/invoicesReducer";
import { successToast } from "../utils/toasts";

const CustomerModal = ({ customer, closeModal }) => {
  const dispatch = useDispatch();
  const [customerName, setCustomerName] = useState(customer.customerName);
  const [customerEmail, setCustomerEmail] = useState(customer.customerEmail);
  const [customerPhone, setCustomerPhone] = useState(customer.customerPhone);
  const [customerAddress, setCustomerAddress] = useState(
    customer.customerAddress
  );
  const { invoices } = useSelector((state) => state.invoices);

  const saveChanges = () => {
    const updatedCustomer = {
      ...customer,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
    };
    dispatch(editCustomer(updatedCustomer));
    dispatch(updateInvoiceCustomer({ invoices, updatedCustomer }));
    successToast("Customer updated successfully");
    closeModal();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-6 w-[400px]">
        <h2 className="text-lg font-bold mb-4">Edit Customer</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="customerName"
              value={customerName || ""}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              name="customerEmail"
              value={customerEmail || ""}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone:</label>
            <input
              type="text"
              name="customerPhone"
              value={customerPhone || ""}
              onChange={(e) => {
                if (isNaN(e.target.value)) return;
                setCustomerPhone(e.target.value);
              }}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Address:</label>
            <textarea
              name="customerAddress"
              value={customerAddress || ""}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-200 px-4 py-2 rounded-lg text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="bg-primaryColor text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
