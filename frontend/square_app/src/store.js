import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customerSlice";
import orderReducer from "./features/ordersSlice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    orders: orderReducer,
  },
});
