const express = require("express");
const apiRoutes = require("./apiRoutes");

const setupRoutesV1 = () => {
  const router = express.Router();
  router.use("/", apiRoutes);
  return router;
};
module.exports = setupRoutesV1;
