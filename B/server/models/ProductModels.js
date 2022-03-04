const db = require("../config");

class ProductModel {
  static getProducts(cb) {
    const query = "SELECT * FROM Products;";

    db.query(query, (err, res) => {
      if (err) cb(err);
      else {
        cb(null, res);
      }
    });
  }

  static getProduct(id, cb) {
    const query = `SELECT * FROM Products WHERE id = ${id}`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, res);
    });
  }

  static createProduct(payload, cb) {
    const query = `INSERT INTO Products (name, price, description) values ('${payload.name}', '${payload.price}', '${payload.description}');`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, { status: "OK", description: "Sukses create product" });
    });
  }

  static updateProduct(id, payload, cb) {
    const query = `UPDATE Products 
      SET 
      name = '${payload.name}',
      price = '${payload.price}',
      description = '${payload.description}'
      WHERE id = ${id};
      `;

    console.log(query, "query update");

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, { status: "OK", description: `Sukses update ${id}` });
    });
  }

  static deleteProduct(id, cb) {
    const query = `DELETE FROM Products WHERE id = ${id};`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else cb(null, { status: "OK", description: `Sukses delete ${id}` });
    });
  }
}

module.exports = ProductModel;
