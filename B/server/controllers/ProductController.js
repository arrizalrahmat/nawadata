const ProductModel = require("../models/ProductModels");

class ProductController {
  static getProducts(req, res, next) {
    ProductModel.getProducts((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    });
  }

  static getProduct(req, res) {
    const { productId } = req.params;
    ProductModel.getProduct(productId, (err, data) => {
      if (err) console.log(err);
      else res.status(200).json(data);
    });
  }

  static createProduct(req, res) {
    const { name, price, description } = req.body;
    console.log(req.body, "ini req.body");
    ProductModel.createProduct({ name, price, description }, (err, data) => {
      if (err) console.log(err);
      else res.status(201).json(data);
    });
  }

  static updateProduct(req, res) {
    const { productId } = req.params;
    const { name, price, description } = req.body;

    ProductModel.updateProduct(
      productId,
      { name, price, description },
      (err, data) => {
        if (err) console.log(err);
        else res.status(200).json(data);
      }
    );
  }

  static deleteProduct(req, res) {
    const { productId } = req.params;

    ProductModel.deleteProduct(productId, (err, data) => {
      if (err) console.log(err);
      else res.status(200).json(data);
    });
  }
}

module.exports = ProductController;
