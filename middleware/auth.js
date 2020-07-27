const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {

    const jwtToken = req.header('Authorization').split(' ')[1];

    if(!jwtToken) {
      return res.status(401).json('Not authorized');
    }

    const payload = await jwt.verify(jwtToken, process.env.jwtSecret);

    req.userId = payload.id;

    next();
  } catch(err) {
    console.error(err.message);
    return res.status(401).json('Not authorized');
  }
}