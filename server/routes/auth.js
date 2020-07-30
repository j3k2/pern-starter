const router = require('express').Router();

const {
  signup,
  login,
  getUser
} = require('../controllers/auth');

const authorized = require('../middleware/auth');

router.post('/auth/signup', signup);

router.post('/auth/login', login);

router.get('/auth/user', authorized, getUser);

module.exports = router;