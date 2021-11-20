const asyncHandler = require('express-async-handler');
const { client, google } = require('./user');
const model = require('../model/user');

const createTab = asyncHandler(async (req, res) => {});

const testDrive = asyncHandler(async (req, res) => {
  const drive = google.drive({ version: 'v3', auth: client });
  const driveRes = await drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name,mimeType)',
  });
  res.status(200).json({
    driveRes,
  });
});

module.exports = { createTab, testDrive };
