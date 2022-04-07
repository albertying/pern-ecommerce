const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateRefreshToken(user_id) {
  const payload = {
    id: user_id,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = generateRefreshToken;
