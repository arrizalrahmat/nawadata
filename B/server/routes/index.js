const route = require("express").Router();
const userRoute = require("./userRoute.js");
const productRoute = require("./productRoute");
const transactionRoute = require("./transactionRoute");

route.get("/", (req, res) => {
  res.send("home");
});

route.use("/users", userRoute);
route.use("/products", productRoute);
route.use("/transactions", transactionRoute);

module.exports = route;
