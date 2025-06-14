const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🛡️ Incoming Authorization Header:", authHeader);

  // Check if token exists and is properly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized - Missing or malformed token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔐 Extracted Token:", token);

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Verified Token Payload:", decoded);

    // Fetch user and exclude password
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.warn("❌ No user found for ID:", decoded.id);
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
  }
};
