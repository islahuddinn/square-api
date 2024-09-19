const express = require("express");

const apiController = require("../Controllers/apiController");
const router = express.Router();

router.get("/get-all-customers", apiController.getAllCustomers);
router.get("/get-all-orders", apiController.getAllOrders);
router.get("/get-all-locations", apiController.ListLocations);
router.post("/create-customer", apiController.createCustomers);
router.post("/create-order", apiController.createOrder);

module.exports = router;
