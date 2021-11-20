const db = require('../db');

async function createTab(userId, docId) {
  const { rows } = await db.query('Insert into tabs(document_id,user_id) values ($1,$2) returning *;', [
    docId,
    userId,
  ]);

  return rows;
}
module.exports = { createTab };
