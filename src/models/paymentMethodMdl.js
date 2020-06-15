const connection = require('../../db/conector.js');

const store = async (params) => {
  // const { idStudent, idPayment, installments } = params;
  const query = `
    INSERT INTO students_payment_method VALUES
    (?,?,?,?,?,?,?);`;

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
      console.log(err);
      throw err;
    }
  );
};

module.exports.store = store;
