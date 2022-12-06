require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { constants } = require('http2');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { celebBodyAuth, celebBodyUserCreate } = require('./validators/user');
const NotFoundError = require('./errors/NotFoundError');
const rateLimiter = require('./middlewares/other');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect(process.env.DB_URL);

app.use(cors());

app.use(rateLimiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/signup', celebBodyUserCreate, createUser);
app.post('/signin', celebBodyAuth, login);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(errorLogger);
app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница с таким адресом не найдена'));
});

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode ? err.statusCode : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message ? { message: err.message } : 'Произошла неизвестная ошибка');
  next();
});
// Обработчик ошибок сервера
app.listen(process.env.PORT);