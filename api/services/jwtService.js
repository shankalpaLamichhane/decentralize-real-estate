const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    return jwt.verify(token,'secret');
}

module.exports = {
    verifyToken,
}