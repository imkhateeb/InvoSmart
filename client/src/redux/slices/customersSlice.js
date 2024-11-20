import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers } from "../reducers/customersReducer";

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
      });
  },
});

export default customersSlice.reducer;
