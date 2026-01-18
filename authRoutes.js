const express = require("express");
const db = require("../db");
const { generateToken } = require("../auth");

const router = express.Router();

router.post("/login", (req, res) => {
  const user = db.users.find(u => u.email === req.body.email);
  if (!user) return res.status(401).json({ error: "User not found" });

  res.json({ token: generateToken(user) });
});

module.exports = router;
