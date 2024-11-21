import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (customers) => {
    return customers;
  }
);

export const editCustomer = createAsyncThunk(
  "customers/editCustomer",
  async (customer) => {
    return customer;
  }
);
