const route = require("express").Router();
const ProductController = require("../controllers/ProductController");

route.get("/", ProductController.getProducts);
route.get("/:productId", ProductController.getProduct);
route.post("/add", ProductController.createProduct);
route.put("/update/:productId", ProductController.updateProduct);
route.delete("/delete/:productId", ProductController.deleteProduct);

module.exports = route;
