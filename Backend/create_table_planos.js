var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "L3TR4&num3r0",
  database: "Dados"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE planos (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255) NOT NULL, aulas INT NOT NULL, valor DECIMAL(10, 2) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});