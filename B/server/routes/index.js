const route = require("express").Router();
const userRoute = require("./userRoute.js");
const productRoute = require("./productRoute");

route.get("/", (req, res) => {
  res.send("home");
});

route.use("/users", userRoute);
route.use("/products", productRoute);

module.exports = route;
