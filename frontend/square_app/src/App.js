import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import CustomersPage from "./components/customersPage";
import OrdersPage from "./components/ordersPage";

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Square API Integration</h1>
        <CustomersPage />
        <OrdersPage />
      </div>
    </Provider>
  );
}

export default App;
