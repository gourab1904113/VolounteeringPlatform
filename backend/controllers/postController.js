import { sql } from "../config/db.js";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await sql`
      SELECT p.*, u.name AS created_by_name
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      ORDER BY p.created_at DESC;
    `;

    console.log("Fetched Posts:", posts);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error in getPosts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  if (!req.user) {
    return res.status(400).send("User not authenticated");
  }

  const { title, content, created_by } = req.body;

  if (!created_by) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: "Title and content are required" });
  }

  try {
    const newPost = await sql`
      INSERT INTO posts (title, content, user_id)
      VALUES (${title}, ${content}, ${created_by})
      RETURNING *;
    `;

    console.log("New Post added:", newPost[0]);
    res.status(201).json({ success: true, data: newPost[0] });
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await sql`
      SELECT * FROM posts WHERE post_id = ${post_id};
    `;

    if (post.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: post[0] });
  } catch (error) {
    console.error("Error in getPost:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { post_id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedPost = await sql`
      UPDATE posts 
      SET title = ${title}, content = ${content}
      WHERE post_id = ${post_id} 
      RETURNING *;
    `;

    if (updatedPost.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: updatedPost[0] });
  } catch (error) {
    console.error("Error in updatePost:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { post_id } = req.params;

  try {
    const deletedPost = await sql`
      DELETE FROM posts WHERE post_id = ${post_id}
      RETURNING *;
    `;

    if (deletedPost.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, data: deletedPost[0] });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
