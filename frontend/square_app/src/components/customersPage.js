import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, createCustomer } from "../features/customerSlice";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.data);

  const [customerData, setCustomerData] = useState({
    given_name: "",
    family_name: "",
    email_address: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomer(customerData));
    setCustomerData({ given_name: "", family_name: "", email_address: "" });
  };

  return (
    <div>
      <h2>Customers</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={customerData.given_name}
          onChange={(e) =>
            setCustomerData({ ...customerData, given_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={customerData.family_name}
          onChange={(e) =>
            setCustomerData({ ...customerData, family_name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={customerData.email_address}
          onChange={(e) =>
            setCustomerData({ ...customerData, email_address: e.target.value })
          }
        />
        <button type="submit">Create Customer</button>
      </form>

      <h3>Customer List</h3>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.given_name} {customer.family_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersPage;
