import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  status: "idle",
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default customersSlice.reducer;
