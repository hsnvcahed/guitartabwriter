const db = require('../db');

async function createTab(userId, docId) {
  const { rows } = await db.query('Insert into tabs(document_id,user_id) values ($1,$2) returning *;', [docId, userId]);

  return rows;
}

async function getTab(userId, docId) {
  const { rows } = await db.query('Select * from tabs where document_id =$1 and user_id =$2;', [docId, userId]);

  return rows;
}

async function deleteTab(userId, docId) {
  const { rows } = await db.query('Delete from tabs where document_id =$1 and user_id =$2 returning *;', [docId, userId]);

  return rows;
}

async function findTabWithLabel(labelId) {
  const { rows } = await db.query('select tab_id from tabs_labels where label_id = $1', [labelId]);

  return rows;
}

module.exports = { createTab, getTab, deleteTab, findTabWithLabel };
