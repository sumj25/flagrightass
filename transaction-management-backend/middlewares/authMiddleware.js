import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token is missing." });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token. Authentication failed." });
    }
    req.user = user;
    next();
  });
};

export const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient privileges." });
    }
    next();
  };
};
