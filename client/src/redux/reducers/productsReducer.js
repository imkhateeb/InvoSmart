import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (products) => {
    return products;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product) => {
    return product;
  }
);
