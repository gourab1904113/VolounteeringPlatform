import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", verifyToken, getEvents);
router.get("/:event_id", getEvent);
router.post("/", verifyToken, createEvent);
router.put("/:event_id", updateEvent);
router.delete("/:event_id", deleteEvent);

export default router;
