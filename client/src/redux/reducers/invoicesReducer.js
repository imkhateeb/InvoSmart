import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (invoices) => {
    return invoices;
  }
);

export const updateInvoiceProduct = createAsyncThunk(
  "invoices/updateProduct",
  async ({invoices, updatedProduct}) => {
    console.log("FIRST", invoices, updatedProduct);
    const updatedInvoice = invoices.map((invoice) => {
      const updatedProducts = invoice.products.map((product) =>
        product.productId === updatedProduct.productId
          ? updatedProduct
          : product
      );
      return { ...invoice, products: updatedProducts };
    });
    console.log("SECOND", updatedInvoice);

    return updatedInvoice;
  }
);

export const updateInvoiceCustomer = createAsyncThunk(
  "invoices/customerName",
  async ({invoices, updatedCustomer}) => {
    console.log("FIRST", invoices, updatedCustomer);
    const updatedInvoice = invoices.map((invoice) => {
      if (invoice.customer.customerId === updatedCustomer.customerId) {
        return { ...invoice, customer: updatedCustomer };
      } else {
        return invoice;
      }
    });

    console.log("SECOND", updatedInvoice);

    return updatedInvoice;
  }
);
