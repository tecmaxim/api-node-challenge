const connection = require('../../db/conector.js');

/**
 *  Save student submited
 * @param {object} params
 * @returns {object}
 */
const save = async (params) => {
  const query = `
    INSERT INTO students_payment_method VALUES
    (?,?,?);`;

  // Save data
  connection.query(
    query,
    params,
    (error, result) => {
      if (error) {
        throw error;
      }

      return {
        status: 200,
        id: result.insertId
      };
    }
  );
};

module.exports.save = save;
