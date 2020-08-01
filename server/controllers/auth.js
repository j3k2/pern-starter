const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();

const { findOne, create, count } = require('../utils/queries');

function getToken(id) {
  const payload = {
    id
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
}

async function signup(req, res) {
  try {
    const { username, password } = req.body;

    const userCount = await count('users', { username });

    if (userCount) {
      return res.status(401).json('User with this username already exists');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const createdUserId = await create('users', { username, password: encryptedPassword });

    if(!createdUserId) {
      return res.status(500).json('Could not create user');
    }

    const token = getToken(createdUserId);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error: ' + err.message);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await findOne('users', { username }, ['password', 'id']);

    if (!user) {
      return res.status(401).json('Could not find account with this username');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json('Incorrect password');
    }

    const token = getToken(user.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error: ' + err.message);
  }
}

async function getUser(req, res) {
  try {
    const user = await findOne('users', { id: req.userId }, ['username', 'id']);

    if (!user) {
      res.status(401).json('Could not find authorized user');
    }

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error: ' + err.message);
  }
}

module.exports = {
  signup,
  login,
  getUser
}