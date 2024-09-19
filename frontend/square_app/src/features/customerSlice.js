import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ////  Fetch all customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/get-all-customers"
    );
    return response.data;
  }
);

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (customerData) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/create-customer",
      customerData
    );
    return response.data;
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    data: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.data = action.payload.customers || [];
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.data.push(action.payload.customer);
      });
  },
});

export default customerSlice.reducer;
