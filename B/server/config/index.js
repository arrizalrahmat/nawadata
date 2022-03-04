var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "administrator",
  database: "nawadata",
});

connection.connect();

module.exports = connection;
