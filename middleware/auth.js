const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Prendi token da header
  const token = req.cookies["access-token"];
  // Check se non c'è token
  if (!token) {
    return res.status(401).json({
      msg: "No token, auth denied",
    });
  }

  // Verifica token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // set user id in req.user
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
