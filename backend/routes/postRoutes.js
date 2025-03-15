import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js"; // Updated controller import

const router = express.Router();

router.get("/", verifyToken, getPosts);
router.get("/:post_id", getPost);
router.post("/", verifyToken, createPost);
router.put("/:post_id", updatePost);
router.delete("/:post_id", deletePost);

export default router;
