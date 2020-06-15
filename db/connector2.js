const mysql = require('mysql2/promise');

const { DB_HOST } = process.env;
const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_DATABASE } = process.env;
const { DB_PORT } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        //if(err) throw err;
        //pass the error to the cb instead of throwing it
        if(err) {
          return cb(err);
        }
        cb(null, connection);
    });
};
module.exports.getConnection = getConnection;

