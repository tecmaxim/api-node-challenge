const connection = require('../../db/connector.js');
const studentsPaymentMethodMdl = require('../models/studentsPaymentMethodMdl.js');

const { LIMIT_DEFAULT } = process.env;

const STUDENT_SELECT = `SELECT 
S.idStudent as id,
S.name,
S.email,
S.career,
S.phone,
S.birthday,
S.country,
PM.description,
SP.installments FROM students S `;

const getAll = (criteria, offset = null, callback) => {
  const query = `
    ${STUDENT_SELECT}
    INNER JOIN students_payment_method SP ON S.idStudent=SP.idStudent
    INNER JOIN payment_methods PM ON PM.id = SP.idPayment
    WHERE S.isActive = 1 ${criteria !== '' ? `AND ${criteria}` : ''}
    LIMIT ${LIMIT_DEFAULT} 
    ${offset !== null ? `OFFSET =${offset}` : ''}
    `;

  connection.query(
    query,
    (err, rows) => {
      if (err) {
        console.error(`[ERROR]:[GET ALL] ${JSON.stringify(err)}`);
        throw err;
      }
      console.log(`[DEBUG]: DATA : ${JSON.stringify(rows)}`);
      callback(rows);
    }
  );
};
module.exports.getAll = getAll;

const getOne = (id, callback) => {
  const query = `
  SELECT 
  S.idStudent as id,
  S.name,
  S.email,
  S.career,
  S.phone,
  S.birthday,
  S.country FROM students S 
    WHERE S.idStudent=${id} AND S.isActive = 1`;

  connection.query(
    query,
    (err, student) => {
      if (err) {
        console.error(`[ERROR]:[GET ONE] ${JSON.stringify(err)}`);
        throw err;
      }
      callback(err, student);
    }
  );
};
module.exports.getOne = getOne;

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
    console.log(student);
    try {
      connection.query(
        query,
        student,
        async (e, result) => {
          if (e) {
            console.error(`[ERROR]: ${JSON.stringify(e)}`);
            connection.rollback(() => {
              throw e;
            });
            status = 500;
          }

          console.log(paymentMethod);
          // Save data of payment
          try {
            const paymentResult = await studentsPaymentMethodMdl.update(paymentMethod, id);
            // If fail rollback
            console.log(paymentResult);
          } catch (ePayment) {
            // if fail on update, rollback
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
            console.log('[DEBUG]: Transaction Complete.');
            connection.end();
          });

          return {
            status,
            id: result.insertId
          };
        }
      );
    } catch (errorQuery) {
      console.error(`[FATAL]: FAIL QUERY ${JSON.stringify(errorQuery)}`);
      throw errorQuery;
    }
  });
};
module.exports.update = update;

const deleteOne = async (id) => {
  // Logic DELETE
  const dataUpdate = {
    student:
    {
      isActive: 0
    },
    paymentMethod: {
      isActive: 0
    }
  };
  return this.update(dataUpdate, id);
};
module.exports.deleteOne = deleteOne;
