import express from "express";
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:event_id", getEvent);
router.post("/", createEvent);
router.put("/:event_id", updateEvent);
router.delete("/:event_id", deleteEvent);
export default router;
