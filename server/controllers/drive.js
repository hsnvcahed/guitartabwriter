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

module.exports = { testDrive, createTab };
