const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_email, user_name) {
  const payload = {
    email: user_email,
    name: user_name,
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
