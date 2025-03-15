import { sql } from "../config/db.js"; // DB connection

// Create a new comment
export const createComment = async (req, res) => {
  const { post_id, content, created_by } = req.body;

  if (!post_id || !content) {
    return res
      .status(400)
      .json({ message: "Post ID and content are required" });
  }

  try {
    // Get the user_id from the verified token

    console.log(post_id);
    console.log(created_by);
    console.log(content);

    // Check if the post exists
    const post = await sql`
      SELECT * FROM posts WHERE post_id = ${post_id}
    `;
    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Insert the comment into the database
    const result = await sql`
      INSERT INTO comments (post_id, user_id, content)
      VALUES (${post_id}, ${created_by}, ${content})
      RETURNING *;
    `;

    res.status(201).json({
      message: "Comment added successfully",
      data: result[0], // Return the created comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get comments for a specific post
export const getCommentsByPost = async (req, res) => {
  const { post_id } = req.params;

  console.log("this is post_id");
  console.log(post_id);

  try {
    // Get the comments for the specific post
    const comments = await sql`
      SELECT comments.comment_id, comments.content, comments.user_id, comments.created_at, users.name AS user_name 
      FROM comments
      JOIN users ON comments.user_id = users.user_id
      WHERE post_id = ${post_id}
      ORDER BY comments.created_at DESC;
    `;

    console.log(comments);

    res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    // Delete the comment
    const deletedComment = await sql`
      DELETE FROM comments WHERE comment_id = ${comment_id} 
      RETURNING *;
    `;

    if (deletedComment.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.status(200).json({ success: true, data: deletedComment[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
