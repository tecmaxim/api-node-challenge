const connection = require('../../db/connector.js');

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
