const axios = require("axios");
require("dotenv").config();
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const { Client, Environment } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const squareApi = axios.create({
  baseURL: "https://connect.squareupsandbox.com/v2",
  headers: {
    Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    "Square-Version": "2024-08-21",
  },
});

exports.getAllCustomers = async (req, res) => {
  try {
    const response = await squareApi.get("/customers");
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching customers");
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const response = await squareApi.get("/orders");
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
};

exports.createCustomers = async (req, res) => {
  try {
    const { given_name, family_name, email_address } = req.body;
    const response = await squareApi.post("/customers", {
      given_name,
      family_name,
      email_address,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error creating customer");
  }
};

exports.createOrder = async (req, res) => {
  // Destructure and validate request body
  const { locationId, customerId, item_name, item_quantity, item_price } =
    req.body;

  // Prepare order payload
  const orderPayload = {
    order: {
      locationId, // Ensure correct property name
      customerId,
      line_items: [
        {
          name: item_name,
          quantity: item_quantity,
          base_price_money: {
            amount: item_price * 100, // Convert dollars to cents
            currency: "USD",
          },
        },
      ],
    },
  };

  try {
    // Create order using Square API
    const response = await squareClient.ordersApi.createOrder(orderPayload);

    // Convert BigInt fields to numbers
    const order = response.result.order;
    const orderJson = JSON.parse(
      JSON.stringify(order, (key, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

    // Respond with the order details
    res.json(orderJson);
  } catch (error) {
    // Handle errors from the API call
    console.error("Error creating order:", error);
    const errorMessage = error.response ? error.response.body : error.message;
    res
      .status(500)
      .json({ error: "Failed to create order", details: errorMessage });
  }
};

exports.ListLocations = async () => {
  try {
    const response = await squareClient.locationsApi.listLocations();
    console.log("Locations:", response.result.locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};
