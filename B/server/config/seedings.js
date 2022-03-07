const db = require("./index");

const seedUsers = `INSERT INTO Users (name, address, phone) values
('arrizal', 'Jl. Poltangan bla bla', '082112692269'),
('bibie', 'Jl. kucing garong', '08128732648723'),
('naruto', 'Jl. Konoha', '0856238742');
`;

const seedProducts = `INSERT INTO Products (name, price, description) values
('lontong', 10000, 'nasi dibungkus daun pisang'),
('lemper', 12000, 'ketan dibungkus daun pisang'),
('lumpia', 15000, 'rebung dibungkus daun pisang');
`;

const seedTransactions = `INSERT INTO Transactions (transactionId, UserId, ProductId) VALUES 
('TR0001/0907/19', 1, 2),
('TR0001/0907/19', 1, 1),
('TR0001/0907/19', 1, 3),
('TR0002/0907/19', 2, 1),
('TR0003/0907/19', 3, 3);
`;

db.query(seedUsers, (err, res) => {
  if (err) console.log(err);
  else {
    db.query(seedProducts, (err) => {
      if (err) console.log(err);
      else {
        db.query(seedTransactions, (err) => {
          if (err) console.log(err);
          else {
            console.log("seeding sukses");
            db.end();
          }
        });
      }
    });
  }
});
