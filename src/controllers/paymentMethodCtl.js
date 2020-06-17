const paymentMethodMdl = require('../models/paymentMethodMdl');

const getPaymentMethods = async (responseCallback) => {
  const criteria = null;
  const offset = null;
  try {
    // Callback response from mysql.query component
    return paymentMethodMdl.getAll(criteria, offset, (payments) => {
      // response is:(status, data)
      responseCallback(200, payments);
    });
  } catch (err) {
    responseCallback({
      status: 500,
      msg: 'ERROR ON TRY GETALL PAYMENTS'
    });
  }
  return true;
};
module.exports.getPaymentMethods = getPaymentMethods;
