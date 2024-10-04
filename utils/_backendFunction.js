const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// JWT Secrets
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Helper function to generate access token (short-lived)
function generateAccessToken(user) {
  return jwt.sign({ email: user.email, uid: user.uid }, JWT_SECRET, {
    expiresIn: "15m", // Access token expires in 15 minutes
  });
}

// Helper function to generate refresh token (long-lived)
function generateRefreshToken(user) {
  return jwt.sign({ email: user.email, uid: user.uid }, JWT_REFRESH_SECRET, {
    expiresIn: "7d", // Refresh token expires in 7 days
  });
}

// Helper function to verify token
function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
}

// Login Route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Fetch user from database
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const user = rows[0];

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Store refresh token in the database
  await pool.execute("UPDATE users SET refresh_token = ? WHERE id = ?", [
    refreshToken,
    user.id,
  ]);

  res.json({
    accessToken,
    refreshToken,
  });
});

// Token Refresh Route
app.post("/auth/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No token provided" });

  try {
    // Verify refresh token
    const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);

    // Fetch user from database
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      decoded.uid,
    ]);
    const user = rows[0];

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user);

    // Optionally rotate refresh token
    const newRefreshToken = generateRefreshToken(user);
    await pool.execute("UPDATE users SET refresh_token = ? WHERE id = ?", [
      newRefreshToken,
      user.id,
    ]);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

// Logout Route
app.post("/auth/logout", async (req, res) => {
  const { email } = req.body;

  // Clear refresh token in the database
  await pool.execute("UPDATE users SET refresh_token = NULL WHERE email = ?", [
    email,
  ]);

  res.json({ message: "Logged out successfully" });
});

// Protected Route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Hello, ${req.user.email}! You have access to this route.`,
  });
});

// Middleware to protect routes (requires a valid access token)
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = verifyToken(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
}

app.listen(3000, () => console.log("Server running on port 3000"));

// ----------------------------------------------------------------

// refresh token with error handling:

app.post("/auth/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No token provided" });

  try {
    // Verify refresh token
    const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);

    // Fetch user from database
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      decoded.uid,
    ]);
    const user = rows[0];

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user);

    // Optionally rotate refresh token
    const newRefreshToken = generateRefreshToken(user);
    await pool.execute("UPDATE users SET refresh_token = ? WHERE id = ?", [
      newRefreshToken,
      user.id,
    ]);

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid refresh token" });
    } else {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
  }
});

app.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  // Check if the refresh token exists in the DB (or another persistent store)
  const storedToken = await findRefreshToken(refreshToken);
  if (!storedToken)
    return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken({
      id: decoded.userId,
      email: decoded.email,
    });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token is required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, refreshTokenSecret);

    // Find the user and validate the refresh token from DB
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});
