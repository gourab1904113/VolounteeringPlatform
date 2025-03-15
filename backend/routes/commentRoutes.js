import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/commentController.js"; // Controller imports for comments

const router = express.Router();

// Route to create a new comment
router.post("/", verifyToken, createComment);

// Route to get comments for a specific post
router.get("/:post_id", getCommentsByPost);

// Route to delete a comment
router.delete("/:comment_id", deleteComment);

export default router;
