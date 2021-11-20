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
    res.status(200).send('Logged in');
  } else {
    res.status(200).json({
      code: 401,
      data: 'You dont have an account, please register',
    });
  }
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
  // model.deleteUserSession(req.session.sid);
  console.log(req.session);

  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
  if (client.credentials.access_token) client.revokeCredentials();
  res.status(200).send('Logged out');
});

module.exports = { login, register, logout, client, google };
