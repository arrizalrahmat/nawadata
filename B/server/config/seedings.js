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

db.query(seedUsers, (err, res) => {
  if (err) console.log(err);
  else {
    db.query(seedProducts, (err) => {
      if (err) console.log(err);
      else {
        console.log("sukses seeding");
        db.end();
      }
    });
  }
});
