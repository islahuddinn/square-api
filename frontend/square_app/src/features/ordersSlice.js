import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

////// Create a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/create-order",
      orderData
    );
    return response.data.order;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    status: "idle",
    lastOrder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.lastOrder = action.payload;
    });
  },
});

export default orderSlice.reducer;
