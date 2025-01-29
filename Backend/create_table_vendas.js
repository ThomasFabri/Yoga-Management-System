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

  var sql = "CREATE TABLE vendas (id INT AUTO_INCREMENT PRIMARY KEY,nome_aluno VARCHAR(255) NOT NULL,nome_plano VARCHAR(255) NOT NULL,valor DECIMAL(10, 2) NOT NULL,data_venda DATETIME DEFAULT CURRENT_TIMESTAMP)";

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Coluna renomeada com sucesso!");
  });
});