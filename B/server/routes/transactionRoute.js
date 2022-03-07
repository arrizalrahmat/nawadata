const route = require("express").Router();
const TransactionControllers = require("../controllers/TransactionControllers");

route.get("/", TransactionControllers.getTransactions);

module.exports = route;
