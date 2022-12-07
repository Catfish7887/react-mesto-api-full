const { constants } = require('http2');

const errorsHandler = (err, req, res, next) => {
  res.status(err.statusCode ? err.statusCode : constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message ? { message: err.message } : 'Произошла неизвестная ошибка');
  next();
};

module.exports = errorsHandler;
