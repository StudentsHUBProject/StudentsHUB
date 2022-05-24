const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Prendi token da header
  const token = req.cookies["access-token"];

  // Check se non c'è token
  if (!token) {
    req.user = false;
  } else {
    // Verifica token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // set user id in req.user
      req.user = decoded.user;
    } catch (error) {
      req.user = false;
    }
  }
  next();
};
