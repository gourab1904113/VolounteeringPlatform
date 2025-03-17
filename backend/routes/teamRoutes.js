import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
} from "../controllers/teamController.js"; // Updated controller import

const router = express.Router();

router.get("/", getTeams);
router.post("/", verifyToken, createTeam);
router.put("/:team_id", updateTeam);
router.delete("/:team_id", deleteTeam);

export default router;
