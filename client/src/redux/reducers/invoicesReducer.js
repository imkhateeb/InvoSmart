import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (invoices) => {
    return invoices;
  }
);
