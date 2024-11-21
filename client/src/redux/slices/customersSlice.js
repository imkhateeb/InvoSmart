import { createSlice } from "@reduxjs/toolkit";
import { editCustomer, fetchCustomers } from "../reducers/customersReducer";

const initialState = {
  customers: [],
  customersLoading: false,
  customersError: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.customersLoading = true;
        state.customersError = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customersLoading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.customersLoading = false;
        state.customersError = action.error.message;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.map((customer) =>
          customer.customerId === action.payload.customerId
            ? action.payload
            : customer
        );
      });
  },
});

export default customersSlice.reducer;
