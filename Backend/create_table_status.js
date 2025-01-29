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
  var sql = "CREATE TABLE status (id INT AUTO_INCREMENT PRIMARY KEY, alunos_ativos INT, alunos_bloqueados INT, alunos_cancelados INT)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});