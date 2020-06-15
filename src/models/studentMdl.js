const connection = require('../../db/conector.js');
const paymentMethodsMdl = require('../models/paymentMethodMdl.js');

const store = async (params) => {
  const query = `
    INSERT INTO students VALUES
    (?,?,?,?,?,?,?);`;

  /* Begin transaction */
  connection.beginTransaction((error) => {
    if (error) { throw error; }
    connection.query(
      query,
      params,
      (err, result) => {
        if (err) {
          connection.rollback(() => {
            throw error;
          });
        }

        // Set data of payment
        const dataPayment = {
          IdStudent: result.insertId,
          idPayment: params.payment.idPayment,
          installments: params.payment.installments
        };
        // Save data of payment
        const paymentResult = paymentMethodsMdl.store(dataPayment);
        // If fail rollback
        if (paymentResult.status === 500) {
          connection.rollback(() => {
            throw error;
          });
        }
        // If all data is stored successfully, commit.
        connection.commit((errCommit) => {
          if (err) {
            connection.rollback(() => {
              throw errCommit;
            });
          }
          console.log('Transaction Complete.');
          connection.end();

          return {
            status: 200,
            id: result.insertId
          };
        });
      }
    );
  });
};

module.exports.store = store;
