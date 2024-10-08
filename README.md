# Square API Integration

## Overview

This project provides an Order Management System that integrates with the Square API to create and manage orders. It includes both backend and frontend components to handle order creation and display the details.

## Features

- **Create Orders**: Submit order details including location, customer, item, and price.
- **Display Order Details**: View newly created order details including order ID, customer ID, item name, and total price.

## Setup

### Backend

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configuration**:
   - Ensure you have a Square API account.
   - Update the `squareClient` configuration in your backend code with your Square API credentials.

3. **Start Server**:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

### Frontend

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

## API Endpoints

- **POST /api/v1/create-order**
  - **Description**: Create a new order with the provided details.
  - **Request Body**:
    ```json
    {
      "locationId": "L05QR5ZBJ84N1",
      "customerId": "D5MD0BNHSWMJA8B5VB50RAV9MM",
      "item_name": "Sample Item",
      "item_quantity": "1",
      "item_price": 150
    }
    ```
  - **Response**:
    ```json
    {
      "orderId": "zPcZ3bkhlSVD5T0juc1PUzbBNf4F",
      "customerId": "D5MD0BNHSWMJA8B5VB50RAV9MM",
      "itemName": "Sample Item",
      "totalPrice": 1.50
    }
    ```

## Usage

1. **Create an Order**:
   - Select a customer.
   - Enter item details (name, quantity, and price).
   - Submit the form to create an order.
   - View the order details displayed on the frontend.

## Contributing

Feel free to submit issues or pull requests. Your contributions are welcome!
