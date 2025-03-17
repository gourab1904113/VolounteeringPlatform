import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { sql } from "../config/db.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { user_id, team_id } = req.body;

  console.log(user_id);
  console.log(team_id);

  if (!user_id || !team_id) {
    return res.status(400).json({ message: "Missing user_id or team_id" });
  }

  try {
    console.log("check");
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
