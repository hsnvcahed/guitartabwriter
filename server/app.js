const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes/movies');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorHandler');

require('colors');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());

app.use(express.json());

app.use('/', routes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

console.log('LISTENING TO PORT ', PORT);

app.listen(PORT);
