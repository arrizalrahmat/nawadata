const route = require("express").Router();
const UserController = require("../controllers/UserControllers");

route.get("/", UserController.getUsers);
route.get("/:userId", UserController.getUser);
route.post("/add", UserController.createUser);
route.put("/update/:userId", UserController.updateUser);
route.delete("/delete/:userId", UserController.deleteUser);

module.exports = route;
