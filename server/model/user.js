const db = require('../db');

async function getUser(email) {
  const res = await db.query('SELECT * from users where email = $1', [email]);

  return res.rows;
}

async function createUser(name, email) {
  const res = await db.query('INSERT INTO users (name, email) VALUES ($1,$2) RETURNING *', [name, email]);
  console.log(res);

  return res.rows;
}

module.exports = { getUser, createUser };
