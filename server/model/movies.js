const db = require('../db');

async function getUser(email) {
  const { rows } = await db.query('SELECT * from users where email = $1', [email]);
  return rows;
}

module.exports = { getUser };
