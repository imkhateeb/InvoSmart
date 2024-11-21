import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInvoices,
  updateInvoiceCustomer,
  updateInvoiceProduct,
} from "../reducers/invoicesReducer";

const initialState = {
  invoices: [],
  invoicesLoading: false,
  invoicesError: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoicesLoading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.invoicesLoading = false;
        state.invoicesError = action.error.message;
      })
      .addCase(updateInvoiceProduct.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })
      .addCase(updateInvoiceCustomer.fulfilled, (state, action) => {
        state.invoices = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
