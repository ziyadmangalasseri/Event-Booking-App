const { verifyToken } = require("../utils/jwt");

// Middleware to check authentication and role
const isAuthenticated = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = verifyToken(token);
      req.user = decoded; // Attach decoded token to request

      // Check if the user's role matches the required role
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
      }

      next(); // Proceed to the next middleware or route
    } catch (err) {
      console.error("Error verifying token:", err.message);
      const errorMessage =
        err.message === "jwt expired"
          ? "Token expired, please log in again"
          : "Invalid token";
      return res.status(401).json({ message: errorMessage });
    }
  };
};

module.exports = { isAuthenticated };
