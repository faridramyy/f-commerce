import jwt from "jsonwebtoken";
import User from "../models/User.js";
import secrets from "../config/secrets.js";

export const authenticateUser = async (req, res, next) => {
  try {
    
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, secrets.JWT_SECRET);
    req.user = decoded;

    // Fetch user from DB to ensure they exist and get latest data
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

// Middleware to restrict access based on roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
