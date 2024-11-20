import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (customers) => {
    return customers;
  }
);
