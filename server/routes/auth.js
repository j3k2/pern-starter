const router = require('express').Router();

const {
  signup,
  login,
  getAuthUser
} = require('../controllers/auth');

const authorizer = require('../middleware/authorizer');

router.post('/auth/signup', signup);

router.post('/auth/login', login);

router.get('/auth/user', authorizer, getAuthUser);

module.exports = router;