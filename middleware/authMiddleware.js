const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //Authorization Bearer
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "There is no token." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req._id = decoded.UserInfo._id;
    req.roles = decoded.UserInfo.roles;

    next();
  });
};

module.exports = authMiddleware;
