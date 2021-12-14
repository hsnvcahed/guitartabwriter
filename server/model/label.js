const db = require('../db');

async function getLabels(userId) {
  const { rows } = await db.query('Select * from labels where user_id in (select user_id from users where email = $1);', [userId]);

  return rows;
}
async function createTabLabel(labelId, tabId) {
  const { rows } = await db.query('INSERT INTO tabs_labels (tab_id,label_id) values ($1,$2) returning *', [tabId, labelId]);

  return rows;
}

async function getUser(userMail) {
  const getUserId = await db.query('select user_id from users where email = $1', [userMail]);
  return getUserId.rows;
}
async function createLabel(labelName, userId) {
  const createLabelRes = await db.query('Insert into labels(user_id,name) values ($1,$2) returning *', [userId, labelName]);

  return createLabelRes.rows;
}

async function getTabLabels(tabId) {
  const { rows } = await db.query('select * from labels where label_id in (select label_id from tabs_labels where tab_id = $1);', [tabId]);

  return rows;
}

async function deleteLabel(labelId) {
  const dbRes = await db.query('Delete from labels where label_id = $1 returning *', [labelId]);

  return dbRes.rows;
}

async function deleteTabLabel(labelId, tabId) {
  const { rows } = await db.query('DELETE from tabs_labels where label_id = $2 and tab_id = $1 returning *', [tabId, labelId]);
  console.log('HERE');
  console.log(labelId);
  console.log(tabId);

  return rows;
}



module.exports = { getLabels, createLabel, deleteLabel, getTabLabels, createTabLabel, deleteTabLabel, getUser };
