const db = require("../config");

class UserModel {
  static getUsers(cb) {
    const query = "SELECT * FROM Users;";

    db.query(query, (err, res) => {
      if (err) cb(err);
      else {
        cb(null, res);
      }
    });
  }

  static getUser(id, cb) {
    const query = `SELECT * FROM Users WHERE id = ${id}`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, res);
    });
  }

  static createUser(payload, cb) {
    const query = `INSERT INTO Users (name, address, phone) values ('${payload.name}', '${payload.address}', '${payload.phone}');`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, { status: "OK", description: "Sukses create user" });
    });
  }

  static updateUser(id, payload, cb) {
    const query = `UPDATE Users 
      SET 
      name = '${payload.name}',
      address = '${payload.address}',
      phone = '${payload.phone}'
      WHERE id = ${id};
      `;

    console.log(query, "query update");

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, { status: "OK", description: `Sukses update ${id}` });
    });
  }

  static deleteUser(id, cb) {
    const query = `DELETE FROM Users WHERE id = ${id};`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, { status: "OK", description: `Sukses delete ${id}` });
    });
  }
}

module.exports = UserModel;
