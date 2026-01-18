const jwt = require("jsonwebtoken");
const SECRET = "SECRET_KEY";

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = { authenticate, generateToken };
