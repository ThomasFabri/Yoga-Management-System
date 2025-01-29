var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "L3TR4&num3r0"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE Dados", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});