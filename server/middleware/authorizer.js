const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];

    if(!token) {
      return res.status(401).json('Not authorized');
    }

    const payload = await jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.id;

    next();
  } catch(err) {
    console.error(err.message);
    return res.status(401).json('Not authorized');
  }
}