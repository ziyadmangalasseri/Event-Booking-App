const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  try {
    return jwt.sign(
      { userId, role, iat: Math.floor(Date.now() / 1000) },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  } catch (err) {
    console.error("Error generating token:", err.message);
    throw new Error("Token generation failed");
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Error verifying token:", err.message);
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken };
