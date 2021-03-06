const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = async (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.status(403).json("Not Authorized");
  }
  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.id = payload.id;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};

module.exports = authorization;
