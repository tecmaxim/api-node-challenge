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
      }

      return {
        status,
        id: result.insertId
      };
    }
  );
};

module.exports.update = update;
