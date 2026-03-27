const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error('JWT_SECRET is not configured');
}

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};

module.exports = { generateToken, verifyToken };