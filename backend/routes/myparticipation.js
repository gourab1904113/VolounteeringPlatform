import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { sql } from "../config/db.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const { user_id } = req.query;
  console.log(user_id);

  if (!user_id) {
    return res.status(400).json({ message: "Missing user_id" });
  }

  const userEvents = await sql`
      SELECT event_id
      FROM userevent
      WHERE user_id = ${user_id};
    `;

  if (userEvents.length === 0) {
    return res.status(200).json({ success: true, data: [] });
  }

  const eventIds = userEvents.map((event) => event.event_id);
  console.log(eventIds);

  try {
    const filteredEvents = [];

    for (const eventId of eventIds) {
      const event = await sql`
    SELECT ve.*, u.name AS created_by_name
    FROM VolunteerEvents ve
    JOIN users u ON ve.created_by = u.user_id
    WHERE ve.event_id = ${eventId}
    ORDER BY ve.created_at DESC;
  `;
      if (event.length > 0) {
        filteredEvents.push(...event);
      }
    }

    console.log(filteredEvents);

    ///send response as products
    res.status(200).json({ success: true, data: filteredEvents });
  } catch (error) {
    console.log("Error in get Events", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
