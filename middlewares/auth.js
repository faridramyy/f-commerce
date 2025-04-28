import jwt from "jsonwebtoken";
import User from "../models/User.js";
import secrets from "../config/secrets.js";

export const auth = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(token, secrets.JWT_SECRET);
      req.user = decoded;

      // Fetch user to verify they still exist
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // If specific roles are required, check
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      req.user = user; // attach full user object if needed later
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Invalid or expired token", error: error.message });
    }
  };
};
