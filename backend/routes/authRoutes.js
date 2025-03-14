import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Store this in .env file

// 🟢 User Registration (Signup)
router.post("/register", async (req, res) => {
  const { name, email, password, skills, causes } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await sql`
      INSERT INTO users (name, email, password, skills, causes)
      VALUES (${name}, ${email}, ${hashedPassword}, ${skills}, ${causes})
      RETURNING user_id, name, email, skills, causes;
    `;

    // Generate JWT Token
    const token = jwt.sign({ user_id: newUser[0].user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: newUser[0],
      token,
    });
  } catch (error) {
    console.log("Error in register:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🟢 User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from database
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ user_id: user[0].user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      token,
      user: {
        user_id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.log("Error in login:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
