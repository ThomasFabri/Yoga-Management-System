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
  var sql = `
    CREATE TABLE IF NOT EXISTS alunos (
      num INT AUTO_INCREMENT PRIMARY KEY,
      cliente VARCHAR(255),
      nascimento DATE,
      sexo VARCHAR(255),
      status VARCHAR(255),
      email VARCHAR(255),
      contato VARCHAR(255),
      cpf VARCHAR(255),
      cep VARCHAR(255),
      logradouro VARCHAR(255),
      numero VARCHAR(255),
      complemento VARCHAR(255),
      bairro VARCHAR(255),
      cidade VARCHAR(255),
      uf VARCHAR(255)
    )`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});