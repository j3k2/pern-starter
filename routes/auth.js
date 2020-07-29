const router = require('express').Router();

const {
  signup,
  login,
  getUser
} = require('../controllers/auth');

const authorized = require('../middlewares/auth');

router.post('/signup', signup);

router.post('/login', login);

router.get('/user', authorized, getUser);

module.exports = router;