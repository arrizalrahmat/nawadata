const TransactionModels = require("../models/TransactionModels");

class TransactionControllers {
  static getTransactions(req, res) {
    const { transactionId } = req.query;
    // console.log(req.query, "req query");
    if (transactionId) {
      TransactionModels.getTransaction(transactionId, (err, data) => {
        if (err) console.log(err);
        else res.status(200).json(data);
      });
    } else {
      TransactionModels.getTransactions((err, data) => {
        if (err) console.log(err);
        else {
          res.status(200).json(data);
        }
      });
    }
  }
}

module.exports = TransactionControllers;
