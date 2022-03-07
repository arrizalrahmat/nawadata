const db = require("../config");

class TransactionModels {
  static getTransactions(cb) {
    const query = `SELECT 
    Transactions.id,
    Transactions.transactionId, 
    Users.name AS customer,
    Products.price
      FROM Transactions
        JOIN Products ON Products.id = Transactions.ProductId
        JOIN Users ON Users.id = Transactions.UserId;`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else {
        let result = [];
        // console.log(res);

        res.forEach((el) => {
          //   console.log(el);
          const d = el.transactionId;
          el.date = new Date(`${d[9]}${d[10]}/${d[7]}${d[8]}/${d[12]}${d[13]}`);
          if (result.length === 0) {
            result.push(el);
          } else {
            for (let i = 0; i < result.length; i++) {
              if (el.transactionId === result[i].transactionId) {
                result[i].price += el.price;
                break;
              } else if (i === result.length - 1) {
                result.push(el);
                break;
              }
            }
          }
        });
        cb(null, result);
      }
    });
  }

  static getTransaction(id, cb) {
    const query = `SELECT 
    Transactions.transactionId, 
    Products.id AS id,
    Users.name AS customer,
    Users.phone,
    Products.name AS product,
    Products.price
      FROM Transactions
    JOIN Products ON Products.id = Transactions.ProductId
    JOIN Users ON Users.id = Transactions.UserId
    WHERE Transactions.transactionId = '${id}' 
    ;`;

    db.query(query, (err, res) => {
      if (err) cb(err);
      else {
        const result = [];
        console.log(res, "ini res");

        res.forEach((el) => {
          el.quantity = 1;
          el.total = el.price;
          if (result.length === 0) {
            result.push(el);
          } else {
            for (let i = 0; i < result.length; i++) {
              if (result[i].id === el.id) {
                result[i].quantity++;
                result[i].total += el.price;
                break;
              } else if (i === result.length - 1) {
                result.push(el);
                break;
              }
            }
          }
        });

        cb(null, result);
      }
    });
  }
}

module.exports = TransactionModels;
