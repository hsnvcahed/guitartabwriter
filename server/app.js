const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const routes = require('./routes/main');

const { notFound, errorHandler } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();
const { NODE_ENV, SESSION_LIFETIME, SESSION_NAME, SESSION_SECRET } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(
  session({
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: SESSION_LIFETIME * 1000 * 60 * 60,
      httpOnly: false,
      sameSite: true,
      secure: NODE_ENV === 'production',
    },
  }),
);

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());

app.use('/', routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

console.log('LISTENING TO PORT ', PORT);

app.listen(PORT);
