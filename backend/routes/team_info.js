import express from "express";
import { sql } from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Get User Profile (Protected Route)
router.get("/:team_id", verifyToken, async (req, res) => {
  const { team_id } = req.params;
  try {
    const posts = await sql`
      SELECT p.*, u.name AS name, u.email AS email
      FROM teamsuser p
      JOIN users u ON p.user_id = u.user_id
      where team_id= ${team_id};
    `;

    console.log(posts);

    console.log("Fetched infos:", posts);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error in getPosts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
