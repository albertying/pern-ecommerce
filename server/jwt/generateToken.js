const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(user_id) {
  const payload = {
    id: user_id,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 5,
  });
}

module.exports = generateAccessToken;
