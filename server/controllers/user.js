const asyncHandler = require('express-async-handler');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const keys = require('../client_secret.json');
const model = require('../model/user');

const client = new OAuth2Client(keys.web.client_id, keys.web.client_secret, 'http://localhost:8080');

const createTabFolder = asyncHandler(async () => {
  const fileMetadata = {
    name: 'GuitarTabWriter',
    mimeType: 'application/vnd.google-apps.folder',
  };
  const drive = google.drive({ version: 'v3', auth: client });
  const driveRes = await drive.files.create({
    resource: fileMetadata,
    fields: 'id',
  });

  return driveRes.data.id;
});

const login = asyncHandler(async (req, res) => {
  const userCode = req.body.code;
  const r = await client.getToken(userCode);

  const UserData = await client.verifyIdToken({ idToken: r.tokens.id_token, audience: keys.web.client_id });
  const userDataDB = await model.getUser(UserData.getPayload().email);

  if (userDataDB.length > 0) {
    const sessions = await model.getUserSessions();
    // Find if Users already has a session
    const userSessionObject = [];
    for (const session of sessions) {
      console.log(session);

      const sessObject = session.sess;
      if (sessObject.userEmail === UserData.getPayload().email) userSessionObject.push(session);
    }
    //
    if (userSessionObject !== []) {
      userSessionObject.forEach((el) => model.deleteUserSession(el.sid));
    }
    client.setCredentials(r.tokens);
    req.session.userEmail = UserData.getPayload().email;
    res.status(200).json({
      code: 200,
      data: UserData.getPayload().email,
    });
  } else {
    res.status(200).json({
      code: 401,
      data: 'You dont have an account, please register',
    });
  }
});

const register = asyncHandler(async (req, res) => {
  const userCode = req.body.code;
  const r = await client.getToken(userCode);

  const UserData = await client.verifyIdToken({ idToken: r.tokens.id_token, audience: keys.web.client_id });

  const userEmail = UserData.getPayload().email;
  const userName = UserData.getPayload().name;
  const result = await model.getUser(userEmail);

  console.log(result);

  if (result.length === 0) {
    client.setCredentials(r.tokens);
    const rootId = await createTabFolder();
    const resultt = await model.createUser(userName, userEmail, rootId);
    res.status(201).json(resultt);
  } else {
    res.status(200).json({
      code: 401,
      data: 'User existiert bereits',
    });
  }
});

const logout = asyncHandler(async (req, res) => {
  // model.deleteUserSession(req.session.sid);
  console.log(req.session);

  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  if (client.credentials.access_token) client.revokeCredentials();
  res.status(200).send('Logged out');
});

module.exports = { login, register, logout, client, google };
