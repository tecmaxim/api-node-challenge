const connection = require('../../db/connector.js');

const { LIMIT_DEFAULT } = process.env;

const store = async (params) => {
  // const { idStudent, idPayment, installments } = params;
  const query = 'INSERT INTO students_payment_method SET ?';

  connection.query(
    query,
    params,
    (err, res) => {
      if (!err) {
        return {
          status: 200,
          id: res.insertId
        };
      }
      console.error(`[DEBUG]:[PaymentMethod] ${JSON.stringify(err)}`);
      throw err;
    }
  );
};
module.exports.store = store;

const getAll = async (criteria, offset = null, callback) => {
  const query = `SELECT * FROM payment_methods 
  LIMIT ${LIMIT_DEFAULT}
  ${offset !== null ? `OFFSET =${offset}` : ''}
  `;

  connection.query(
    query,
    (err, rows) => {
      if (err) {
        console.error(`[ERROR]:  ${JSON.stringify(err)}`);
        throw err;
      }
      console.log(`[DEBUG]: DATA : ${JSON.stringify(rows)}`);
      callback(rows);
    }
  );
};
module.exports.getAll = getAll;
