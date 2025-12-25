const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    // 1. Get token from header
    // 2. Verify token
    // 3. If fail: res.status(401).send()
    // 4. If success: req.user = decoded; next();
    try {
        console.log('=== AUTH MIDDLEWARE HIT ===');
        console.log('Headers:', req.headers);
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    }
  }

  module.exports = {auth}