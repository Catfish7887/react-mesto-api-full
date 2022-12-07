const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { celebBodyAuth, celebBodyUserCreate } = require('../validators/user');
const { login, createUser } = require('../controllers/users');

router.post('/signup', celebBodyUserCreate, createUser);
router.post('/signin', celebBodyAuth, login);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Страница с таким адресом не найдена'));
});

module.exports = router;
