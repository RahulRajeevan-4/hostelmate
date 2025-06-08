import express from "express";
import validator from "validator";
import bcrypt, { hash } from "bcryptjs";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // --- Input Validation ---
  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // A common practice for password length is 8 characters, but 6 is fine if that's your requirement.
  if (password.length < 6) {
    // Changed to '<' to match your message "more than 6"
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  try {
    // --- Check if user already exists ---
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // --- Hash the password ---
    const salt = await bcrypt.genSalt(10); // bcrypt.genSalt is async
    const hashedPassword = await bcrypt.hash(password, salt); // bcrypt.hash is async

    // --- Insert the new user into the database ---
    const newUserResult = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    // --- Send a success response ---
    res.status(201).json({
      message: "User registered successfully!",
      user: newUserResult.rows[0], // Optionally send back some user info (e.g., id, email)
    });
  } catch (err) {
    console.error("Error during signup process:", err.stack);
    // Generic error message for internal server errors
    res
      .status(500)
      .json({
        message:
          "An error occurred during registration. Please try again later.",
      });
  }
});

authRoutes.post("/login", async (req, res) => {
  // Added 'async'
  const { email, password } = req.body;

  // --- Input Validation ---
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  try {
    // --- 1. Find the user by email in the database ---
    const result = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0]; // Get the first user found (should be unique)

    // --- 2. Check if user exists ---
    if (!user) {
      // Use a generic message for security, don't reveal if email or password was wrong
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // --- 3. Compare the provided password with the stored hashed password ---
    // Use bcrypt.compare (async)
    const passwordMatch = await bcrypt.compare(password, user.password);

    // --- 4. Handle login result ---
    if (passwordMatch) {
      // Login successful!
      // In a real application, you'd generate and send a JWT here.
      // For now, just send a success message.
      var token = jwt.sign(user, "shhhhh");
      return res.status(200).json({
        message: "Login successful!",
        token
      });
    } else {
      // Password doesn't match
      return res.status(400).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    console.error("Error during login process:", err.stack);
    res
      .status(500)
      .json({
        message: "An error occurred during login. Please try again later.",
      });
  }
});

export default authRoutes;
