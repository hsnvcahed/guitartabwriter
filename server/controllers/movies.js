const asyncHandler = require('express-async-handler');
const model = require('../model/movies');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const keys = require('../client_secret.json');

const client = new OAuth2Client(keys.web.client_id, keys.web.client_secret, 'http://localhost:8080');

const login = asyncHandler(async (req, res) => {
  const userCode = req.body.code;
  const r = await client.getToken(userCode);
  client.setCredentials(r.tokens);
  const drive = google.drive({ version: 'v3', auth: client });
  const driveRes = await drive.files.list({
    pageSize: 20,
    fields: 'nextPageToken, files(id, name,mimeType)',
  });
  res.status(200).json(driveRes.data.files);
});

module.exports = { login };
