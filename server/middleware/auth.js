const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // Remove "Bearer "
    const actualToken = token.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(actualToken, "secretkey");

    // Attach user info
    req.user = decoded;

    next(); // move to next step

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;