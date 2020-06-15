const studentMdl = require('../models/studentMdl');
// const paymentMethodCtl = require('../models/paymentMethodMdl');

const save = async (studentData) => {
  try {
    console.log(`[DEBUG] ${JSON.stringify(studentData)}`);
    return await studentMdl.store(studentData);
  } catch (error) {
    throw error;
  }
};

module.exports.save = save;
