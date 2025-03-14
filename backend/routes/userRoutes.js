import express from "express";
import { sql } from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Get User Profile (Protected Route)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await sql`
      SELECT user_id, name, email, skills, causes FROM users WHERE user_id = ${req.user.user_id};
    `;

    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: user[0] });
  } catch (error) {
    console.log("Error in getProfile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🟢 Update User Profile (Protected Route)
router.put("/profile", verifyToken, async (req, res) => {
  const { name, skills, causes } = req.body;

  try {
    const updatedUser = await sql`
      UPDATE users 
      SET name = ${name}, skills = ${skills}, causes = ${causes}
      WHERE user_id = ${req.user.user_id}
      RETURNING user_id, name, email, skills, causes;
    `;

    if (updatedUser.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser[0] });
  } catch (error) {
    console.log("Error in updateProfile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
