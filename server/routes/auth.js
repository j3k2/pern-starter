const router = require('express').Router();

const {
  signup,
  login,
  getUser
} = require('../controllers/auth');

const authorizer = require('../middleware/authorizer');

router.post('/auth/signup', signup);

router.post('/auth/login', login);

router.get('/auth/user', authorizer, getUser);

module.exports = router;