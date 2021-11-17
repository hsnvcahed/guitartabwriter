const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const keys = require('../client_secret.json');
const model = require('../model/user');

const client = new OAuth2Client(keys.web.client_id, keys.web.client_secret, 'http://localhost:8080');

const login = asyncHandler(async (req, res) => {
  const userCode = req.body.code;
  const r = await client.getToken(userCode);

  const UserData = await client.verifyIdToken({ idToken: r.tokens.id_token, audience: keys.web.client_id });
  const userDataDB = await model.getUser(UserData.getPayload().email);
  console.log(userDataDB);

  if (userDataDB.length > 0) {
    req.session.userEmail = UserData.getPayload().email;
    client.setCredentials(r.tokens);

    res.status(200).json({
      cookie: req.session,
    });
  } else {
    res.status(200).json({
      code: 401,
      data: 'You dont have an account, please register',
    });
  }
});

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

const register = asyncHandler(async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);

  const userName = req.body.name;
  const result = await model.getUser(userEmail);

  console.log(result);

  if (result.length === 0) {
    const resultt = await model.createUser(userName, userEmail);
    res.status(201).json(resultt);
  } else {
    res.status(200).json({
      code: 401,
      data: 'User existiert bereits',
    });
  }
});

const logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  res.status(200).send('Logged out');
  if (client.credentials.access_token) client.revokeCredentials();
});

module.exports = { login, register, testDrive, logout };
