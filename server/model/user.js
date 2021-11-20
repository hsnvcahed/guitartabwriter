const db = require('../db');

async function getUser(email) {
  const res = await db.query('SELECT * from users where email = $1', [email]);

  return res.rows;
}

async function createUser(name, email, rootId) {
  const res = await db.query('INSERT INTO users (name, email,root_folder) VALUES ($1,$2,$3) RETURNING *', [
    name,
    email,
    rootId,
  ]);

  return res.rows;
}

async function deleteUserSession(sid) {
  const res = await db.query('DELETE FROM session WHERE sid = $1 returning *', [sid]);
  return res.rows;
}

async function getUserSessions() {
  const res = await db.query('SELECT * from session');
  return res.rows;
}

module.exports = { getUser, createUser, deleteUserSession, getUserSessions };
