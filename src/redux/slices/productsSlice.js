import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default productsSlice.reducer;
