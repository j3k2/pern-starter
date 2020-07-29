const db = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require('dotenv').config();

function jwtGenerator(id) {
  const payload = {
    id
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
}

async function signup(req, res) {
  try {
    const { username, password } = req.body;

    const response = await db.query('SELECT * FROM users WHERE username = $1', [
      username
    ]);

    if (response.rows.length) {
      return res.status(401).json('User with this username already exists');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const insertResponse = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [
      username,
      encryptedPassword
    ]);

    const token = jwtGenerator(insertResponse.rows[0].id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error: ' + err.message);
  }
}

async function login (req, res) {
  try {
    const { username, password } = req.body;

    const response = await db.query('SELECT * FROM users WHERE username = $1', [
      username
    ]);

    if (!response.rows.length) {
      return res.status(401).json('Could not find account with this username');
    }

    const validPassword = await bcrypt.compare(password, response.rows[0].password);

    if (!validPassword) {
      return res.status(401).json('Incorrect password');
    }

    const token = jwtGenerator(response.rows[0].id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error: ' + err.message);
  }
}

async function getUser(req, res) {
  try {
    const userId = req.userId;
    const response = await db.query('SELECT * FROM users WHERE id = $1', [
      userId
    ]);
    const user = response.rows[0];

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