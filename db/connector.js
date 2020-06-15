const mysql = require('mysql');

const { DB_HOST } = process.env;
const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_DATABASE } = process.env;
const { DB_PORT } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  multipleStatements: true
});


connection.connect(async (err) => {
  if (err) {
    console.error(`[CRITICAL]: DB CONECTION CRASHED: ${JSON.stringify(err)}`);
    throw err;
  } else {
    console.log('[DEBUG]: DB CONNECTED');
  }
});

module.exports.conector = connection;

const transaction = async (pool, callback) => {

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {

    await callback(connection);
    await connection.commit();

  } catch (err) {

    await connection.rollback();
    // Throw the error again so others can catch it.
    throw err;

  } finally {

    connection.release();

  }


}
