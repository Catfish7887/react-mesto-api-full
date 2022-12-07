require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');

const rateLimiter = require('./middlewares/other');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

const app = express();
mongoose.connect(process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost:27017/mydb');

app.use(cors());
app.use(rateLimiter);
app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);

// Код будет удалён после успешного прохождения ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

// Обработчик ошибок Joi
app.use(errors());

// Централизованный обработчик ошибо
app.use(errorsHandler);

app.listen(process.env.PORT);
