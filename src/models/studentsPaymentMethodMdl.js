const connection = require('../../db/connector.js');

/**
 *  Save student submited
 * @param {object} params
 * @returns {object}
 */
const store = async (params) => {
  console.log('estoy en payment');
  const query = 'INSERT INTO students_payment_method SET ?';

  // Save data
  connection.query(
    query,
    params,
    (err, result) => {
      if (!err) {
        return {
          status: 200,
          id: result.insertId
        };
      }
      console.error(`[DEBUG]:[PaymentMethod] ${JSON.stringify(err)}`);
    }
  );
};

module.exports.store = store;

const update = async (data, id) => {
  let status = 200;
  const query = `UPDATE students_payment_method SET ?
   WHERE idStudent = ${id}`;

  // Save data
  connection.query(
    query,
    data,
    (err, result) => {
      if (err) {
        status = 500;
        console.error(`[DEBUG]:[PaymentMethod] ${JSON.stringify(err)}`);
        throw err;
      }

      return {
        status,
        id: result.insertId
      };
    }
  );
};

module.exports.update = update;

const getOne = async (id, callback) => {
  const query = `SELECT S.id as id, S.description, SP.installments  FROM payment_methods S
  INNER JOIN students_payment_method SP ON S.id=SP.idPayment
  WHERE SP.idStudent = ${id} 
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
module.exports.getOne = getOne;