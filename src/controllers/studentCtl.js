const studentMdl = require('../models/studentMdl');
// const paymentMethodCtl = require('../models/paymentMethodMdl');

const save = async (studentData) => {
  let result;
  console.log(`[DEBUG]: NEW STUDENT ${JSON.stringify(studentData)}`);
  try {
    result = await studentMdl.store(studentData);
  } catch (e) {
    result = {
      status: 500,
      msg: 'Error on store'
    };
  }
  return result;
};
module.exports.save = save;

const update = async (studentData, student) => {
  let result;
  console.log(`[DEBUG]: update STUDENT ${student.id} DATA: ${JSON.stringify(studentData)} `);
  try {
    result = await studentMdl.update(studentData, student.id);
  } catch (e) {
    result = {
      status: 500,
      msg: 'Error on store'
    };
  }
  return result;
};

module.exports.update = update;
