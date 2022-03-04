CREATE TABLE Users (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(30) NOT NULL,
    phone VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE Transactions (
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
);

INSERT INTO Users (firstname, lastname, email) values
('arrizal', 'kurniawan', 'arrizalrahmat@gmail.com'),
('bibie', 'julius', 'bijul@gmail.com'),
('naruto', 'kobayashi', 'naba@gmail.com');

INSERT INTO Products (name, price, description) values
('lontong', 10000, 'nasi dibungkus daun pisang'),
('lemper', 12000, 'ketan dibungkus daun pisang'),
('lumpia', 15000, 'rebung dibungkus daun pisang');