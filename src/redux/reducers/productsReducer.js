import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    return {};
  }
);
