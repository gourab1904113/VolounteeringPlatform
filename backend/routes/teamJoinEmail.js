import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { sql } from "../config/db.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { email, team_id } = req.body;

  if (!email || !team_id) {
    return res.status(400).json({ message: "Missing email or team_id" });
  }

  try {
    // Fetch user_id from users table using email
    const userResult = await sql`
      SELECT user_id FROM users WHERE email = ${email}
    `;

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = userResult[0].user_id;
    console.log("User ID:", user_id);
    console.log("Team ID:", team_id);

    // Check if the user has already joined the event
    const existingJoin = await sql`
      SELECT * FROM teamsuser WHERE user_id = ${user_id} AND team_id = ${team_id}
    `;

    // If the user already joined, return a message but don't block other users
    if (existingJoin.length > 0) {
      return res.status(200).json({
        success: true,
        message: "You have already joined this Team.",
      });
    }

    // Insert a new record for the user joining the event
    const newJoin = await sql`
      INSERT INTO teamsuser (user_id, team_id)
      VALUES (${user_id}, ${team_id})
      RETURNING *
    `;

    console.log("User joined team", newJoin[0]);
    res.status(201).json({ success: true, data: newJoin[0] });
  } catch (error) {
    console.log("Error in join team", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
