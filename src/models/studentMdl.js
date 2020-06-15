const connection = require('../../db/connector.js');
const studentsPaymentMethodMdl = require('../models/studentsPaymentMethodMdl.js');

const store = async (params) => {
  let status;
  const query = 'INSERT INTO students SET ?';

  // Begin transaction
  connection.beginTransaction((error) => {
    const { student } = params;
    const { paymentMethod } = params;

    try {
      connection.query(
        query,
        student,
        async (e, result) => {
          if (e) {
            console.error(`[DEBUG]: ${JSON.stringify(e)}`);
            connection.rollback(() => {
              throw e;
            });
            status = 500;
          }

          // Set data of payment
          const dataPayment = {
            IdStudent: result.insertId,
            idPayment: paymentMethod.id,
            installments: paymentMethod.installments
          };
          console.log(dataPayment);
          // Save data of payment
          try {
            const paymentResult = await studentsPaymentMethodMdl.store(dataPayment);
            // If fail rollback
            console.log(paymentResult);
          } catch (ePayment) {
            connection.rollback(() => {
              throw ePayment;
            });
            status = 500;
          }

          // If all data is stored successfully, commit.
          connection.commit((errCommit) => {
            if (errCommit) {
              connection.rollback(() => {
                throw errCommit;
              });
              status = 500;
            }
            console.log('Transaction Complete.');
            connection.end();
          });

          return {
            status,
            id: result.insertId
          };
        }
      );
    } catch (errorQuery) {
      console.error(`[ERROR]: FAIL QUERY ${JSON.stringify(errorQuery)}`);
      throw errorQuery;
    }
  });
};

module.exports.store = store;

const update = async (data, id) => {
  let status;
  const query = `UPDATE students SET ? WHERE idStudent = ${id}`;

  // Begin transaction
  connection.beginTransaction((error) => {
    const { student } = data;
    const { paymentMethod } = data;

    try {
      connection.query(
        query,
        student,
        async (e, result) => {
          if (e) {
            console.error(`[DEBUG]: ${JSON.stringify(e)}`);
            connection.rollback(() => {
              throw e;
            });
            status = 500;
          }

          // Set data of payment
          const dataPayment = {
            idPayment: paymentMethod.id,
            installments: paymentMethod.installments
          };
          console.log(dataPayment);
          // Save data of payment
          try {
            const paymentResult = await studentsPaymentMethodMdl.update(dataPayment, id);
            // If fail rollback
            console.log(paymentResult);
          } catch (ePayment) {
            connection.rollback(() => {
              throw ePayment;
            });
            status = 500;
          }

          // If all data is stored successfully, commit.
          connection.commit((errCommit) => {
            if (errCommit) {
              connection.rollback(() => {
                throw errCommit;
              });
              status = 500;
            }
            console.log('Transaction Complete.');
            connection.end();
          });

          return {
            status,
            id: result.insertId
          };
        }
      );
    } catch (errorQuery) {
      console.error(`[ERROR]: FAIL QUERY ${JSON.stringify(errorQuery)}`);
      throw errorQuery;
    }
  });
};

module.exports.update = update;
