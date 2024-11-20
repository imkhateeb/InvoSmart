import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "./redux/slices/invoicesSlice";
import productsReducer from "./redux/slices/productsSlice";
import customersReducer from "./redux/slices/customersSlice";

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});

export default store;
