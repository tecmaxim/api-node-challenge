const studentMdl = require('../models/studentMdl');
const studPayment = require('../models/studentsPaymentMethodMdl.js')
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
    result = studentMdl.update(studentData, student.id);
  } catch (e) {
    result = {
      status: 500,
      msg: 'Error on store'
    };
  }
  return result;
};
module.exports.update = update;

const getAllStudents = (queryParams, responseCallback) => {
  let criteriaString = '';
  let { offset } = queryParams;
  // Delete from object
  if (offset) {
    delete queryParams.offset;
  } else {
    offset = null;
  }
  // Create string criteria
  Object.keys(queryParams).forEach((key) => {
    criteriaString += criteriaString === '' ? '' : ' and ';
    criteriaString += `${key} like '%${queryParams[key]}%'`;
  });

  console.log(`[DEBUG]:GET ALL STUDENTS
    WHERE ${criteriaString}, 
    OFFSET ${offset}
  `);
  try {
    // Callback response from mysql.query component
    return studentMdl.getAll(criteriaString, offset, (students) => {
      // response is:(status, data)
      responseCallback(200, students);
    });
  } catch (err) {
    responseCallback({
      status: 500,
      msg: 'ERROR ON TRY GETALL'
    });
  }
};
module.exports.getAllStudents = getAllStudents;

const getOneStudent = async (student, responseCallback) => {
  let final; 
  try {
    // Callback response from mysql.query component
    studentMdl.getOne(student.id, (err, studentFound) => {
      // response is:(status, data)
      console.log(studentFound[0].id);
      studPayment.getOne(studentFound[0].id, (result) => {
        final = { studnet: studentFound[0]}
        final.studnet.paymentMethod= result;

        responseCallback(200, final);
      })

    });
  } catch (err) {
    responseCallback({
      status: 500,
      msg: 'ERROR ON TRY GETALL'
    });
  }
  return true;
};
module.exports.getOneStudent = getOneStudent;

const deleteStudent = async (student) => {
  let result;
  console.log(`[DEBUG]: DELETING STUDENT ${student.id}} `);
  try {
    result = await studentMdl.deleteOne(student.id);
  } catch (e) {
    result = {
      status: 500,
      msg: 'Error on store'
    };
  }
  return result;
};
module.exports.deleteStudent = deleteStudent;
