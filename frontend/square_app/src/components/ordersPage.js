import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/ordersSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.data);
  const lastOrder = useSelector((state) => state.orders.lastOrder);

  const [orderData, setOrderData] = useState({
    locationId: "L05QR5ZBJ84N1",
    customerId: "",
    item_name: "",
    item_quantity: 1,
    item_price: 100,
  });

  const [createdOrder, setCreatedOrder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderData.customerId) {
      alert("Please select a customer before creating an order.");
      return;
    }

    dispatch(createOrder(orderData));

    setOrderData({
      locationId: "L05QR5ZBJ84N1",
      customerId: "",
      item_name: "",
      item_quantity: 1,
      item_price: 100,
    });
  };

  useEffect(() => {
    if (lastOrder) {
      setCreatedOrder(lastOrder);
    }
  }, [lastOrder]);

  const getCustomerNameById = (id) => {
    const customer = customers.find((customer) => customer.id === id);
    return customer
      ? `${customer.given_name} ${customer.family_name}`
      : "Unknown Customer";
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={orderData.customerId}
          onChange={(e) =>
            setOrderData({ ...orderData, customerId: e.target.value })
          }
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.given_name} {customer.family_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item Name"
          value={orderData.item_name}
          onChange={(e) =>
            setOrderData({ ...orderData, item_name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={orderData.item_quantity}
          onChange={(e) =>
            setOrderData({ ...orderData, item_quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price (in cents)"
          value={orderData.item_price}
          onChange={(e) =>
            setOrderData({ ...orderData, item_price: e.target.value })
          }
        />
        <button type="submit">Create Order</button>
      </form>

      {createdOrder && (
        <div>
          <h3>Order Created Successfully</h3>
          <p>Customer Name: {getCustomerNameById(createdOrder.customer_id)}</p>
          <p>Order ID: {createdOrder.id}</p>
          <p>
            Total Price: ${(createdOrder.total_money?.amount / 100).toFixed(2)}{" "}
            USD
          </p>
          <p>Item Name: {orderData.item_name}</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
