import { createSlice } from "@reduxjs/toolkit";
import { editProduct, fetchProducts } from "../reducers/productsReducer";

const initialState = {
  products: [],
  productsLoading: false,
  productsError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsError = action.error.message;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.productId === action.payload.productId ? action.payload : product
        );
      });
  },
});

export default productsSlice.reducer;
