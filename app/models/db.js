const mysql = require("mysql2");
require('dotenv').config()

var connection = mysql.createConnection({
  host    : process.env.MYSQL_HOST,
  user    : process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port    : process.env.MYSQL_PORT 
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database. " 
  + " -host:"+process.env.MYSQL_HOST 
  + " -user:"+process.env.MYSQL_USER
  + " -database:"+process.env.MYSQL_DB
  + " -port:"+ process.env.MYSQL_PORT );
});

module.exports = connection;
