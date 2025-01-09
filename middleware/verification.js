const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verification = expressAsyncHandler(async (req, res, next) => {
  let token;
  const accesstoken = req.headers['authorization'];
  if (accesstoken) {
    token = accesstoken;
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded.user;
      return next();
    } catch (err) {
      return res.status(400).json({ message: "User unauthorized" });
    }
  } else {
    return res.status(400).json({ message: "User is not authorized" });
  }
});

module.exports = verification;
