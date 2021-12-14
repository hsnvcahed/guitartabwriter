const asyncHandler = require('express-async-handler');
const model = require('../model/label');

const getLabels = asyncHandler(async (req, res) => {
  const userMail = req.params.user;

  if (req.query.tab) {
    const dbRes = await model.getTabLabels(req.query.tab);
    res.status(200).json(dbRes);
    return;
  }
  if (userMail) {
    const dbRes = await model.getLabels(userMail);
    res.status(200).json(dbRes);
  } else res.status(500).send('Bad Request');
});

const createLabel = asyncHandler(async (req, res) => {
  const labelName = req.body.label;
  const userMail = req.body.user;
  const userId = await model.getUser(userMail);

  const dbRes = await model.createLabel(labelName, userId.user_id);

  res.status(200).json(dbRes);
});

const deleteLabel = asyncHandler(async (req, res) => {
  const labelId = req.params.id;

  const dbRes = await model.deleteLabel(labelId);

  res.status(200).json(dbRes);
});

const deleteTabLabel = asyncHandler(async (req, res) => {
  const labelId = req.body.id;
  const tabId = req.body.tab;

  const dbRes = await model.deleteTabLabel(labelId, tabId);

  res.status(200).json(dbRes);
});

const createTabLabel = asyncHandler(async (req, res) => {
  const labelId = req.body.label;
  const tabId = req.body.tab;

  const dbRes = await model.createTabLabel(labelId, tabId);

  res.status(200).json(dbRes);
});

module.exports = { getLabels, createLabel, deleteLabel, deleteTabLabel, createTabLabel };
