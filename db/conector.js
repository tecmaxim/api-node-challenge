const mysql = require('mysql');

const { DB_HOST } = process.env;
const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_DATABASE } = process.env;
const { DB_PORT } = process.env;


const mysql = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  multipleStatements: true
});

mysql.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('[DEBUG]: DB CONNECTED');
  }
});

module.exports = mysql;