const db = require(".");

const queryUsers = `CREATE TABLE Users (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL
);`;

const queryProducts = `CREATE TABLE Products (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    price INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL
);`;

const queryTransactions = `CREATE TABLE Transactions (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  transactionId VARCHAR(30) NOT NULL,
  UserId INT(6) NOT NULL,
  ProductId INT(6) NOT NULL,
  FOREIGN KEY (UserId) 
  REFERENCES Users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (ProductId)
  REFERENCES Products(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);`;

db.query(queryUsers, (err) => {
  if (err) console.log(err, "users");
  else {
    db.query(queryProducts, (err) => {
      if (err) console.log(err, "products");
      else {
        db.query(queryTransactions, (err, res) => {
          if (err) console.log(err, "transactions");
          else {
            console.log(res);
            db.end();
          }
        });
      }
    });
  }
});
