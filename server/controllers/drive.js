const asyncHandler = require('express-async-handler');
const { client, google } = require('./user');
const model = require('../model/user');
const model_drive = require('../model/drive');

const drive = google.drive({ version: 'v3', auth: client });

const testDrive = asyncHandler(async (req, res) => {
  const driveRes = await drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name,mimeType)',
  });
  res.status(200).json({
    driveRes,
  });
});

const createTab = asyncHandler(async (req, res) => {
  const userMail = req.body.email;
  const tabName = req.body.tabName;
  const userDBdata = await model.getUser(userMail);
  const rootId = userDBdata[0].root_folder;
  const fileMetadata = {
    name: tabName,
    parents: [rootId],
    mimeType: 'application/vnd.google-apps.document',
  };
  console.log('USER DATA');
  console.log(req.body);

  console.log(userDBdata);
  if (userDBdata.length === 0) {
    res.status(400).send('User Not Found');
    return;
  }
  const driveRes = await drive.files.create({
    resource: fileMetadata,
    fields: 'id',
  });

  const dbRes = await model_drive.createTab(userDBdata[0].user_id, driveRes.data.id);
  res.status(200).json(dbRes);
});

const getTabs = asyncHandler(async (req, res) => {
  if (req.query.label) {
    const dbRes = await model_drive.findTabWithLabel(req.query.label);
    res.status(200).json(dbRes);
    return;
  }
  const userMail = req.params.email;
  const userDBdata = await model.getUser(userMail);
  const rootId = userDBdata[0].root_folder;
  const driveRes = await drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name,modifiedTime)',
    q: `'${rootId}' in parents`,
  });
  res.status(200).json(driveRes);
});

const deleteTab = asyncHandler(async (req, res) => {
  const userMail = req.body.email;
  const tabId = req.body.tabId;
  const userDBdata = await model.getUser(userMail);

  const dbTabsData = await model_drive.getTab(userDBdata[0].user_id, tabId);

  if (dbTabsData.length === 0) {
    res.status(400).send('File doesnt exist');
    return;
  }

  await drive.files.delete({
    fileId: tabId,
  });

  const dbRes = await model_drive.deleteTab(userDBdata[0].user_id, tabId);

  res.status(200).json(dbRes);
});

module.exports = { testDrive, createTab, getTabs, deleteTab };
