const UserModel = require("../models/UserModels");

class UserController {
  static getUsers(req, res, next) {
    UserModel.getUsers((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  }

  static getUser(req, res) {
    const { userId } = req.params;
    UserModel.getUser(userId, (err, data) => {
      if (err) console.log(err);
      else res.status(200).json(data);
    });
  }

  static createUser(req, res) {
    const { name, address, phone } = req.body;
    console.log(req.body, "ini req.body");
    UserModel.createUser({ name, address, phone }, (err, data) => {
      if (err) console.log(err);
      else res.status(201).json(data);
    });
  }

  static updateUser(req, res) {
    const { userId } = req.params;
    const { name, address, phone } = req.body;

    UserModel.updateUser(userId, { name, address, phone }, (err, data) => {
      if (err) console.log(err);
      else res.status(200).json(data);
    });
  }

  static deleteUser(req, res) {
    const { userId } = req.params;

    UserModel.deleteUser(userId, (err, data) => {
      if (err) console.log(err);
      else res.status(200).json(data);
    });
  }
}

module.exports = UserController;
