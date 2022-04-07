const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshTokenAuthorization = async (req, res, next) => {
  const refreshToken = req.header("refreshToken");
  if (!refreshToken) {
    return res.status(403).json("Not Authorized");
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.id = payload.id;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};

module.exports = refreshTokenAuthorization;
