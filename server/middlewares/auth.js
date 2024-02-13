const jwt = require("jsonwebtoken");
const { MONGO_URI, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        res.status(403).json({ message: "Access denied" });
        return;
      }
      req.user = payload;
      next();
    });
  } else {
    res.status(403).json({ message: "Access denied" });
  }
}

module.exports = { auth };
