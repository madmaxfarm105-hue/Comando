const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // Change this to your actual secret key

// Function to generate a token
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to verify a token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Invalid Token');
    }
};

module.exports = { generateToken, verifyToken };