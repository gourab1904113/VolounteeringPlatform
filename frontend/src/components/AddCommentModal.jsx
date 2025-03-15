import React, { useState } from "react";
import toast from "react-hot-toast";
import { useComments } from "../store/useComments";

function AddCommentModal({ post_id }) {
  const { addComment, setFormData, formData, resetForm } = useComments(); // Updated to use addComment for comment-specific logic
  const [localFormData, setLocalFormData] = useState(formData);

  const handleChange = (e) => {
    const updatedForm = { ...localFormData, [e.target.name]: e.target.value };
    setLocalFormData(updatedForm);
    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")); // Get user object
    const user_id = user ? user.user_id : null;

    if (!user || !user.user_id) {
      toast.error("User authentication required.");
      return;
    }

    // Add created_by to the form data
    const updatedFormData = {
      ...localFormData,
      created_by: user_id, // Add the user_id here
      post_id: post_id,
    };

    // Pass the updated form data to addComment
    await addComment(e, updatedFormData); // Changed to addComment
    setLocalFormData({
      content: "", // Reset to comment-related fields
      post_id: post_id, // Keep the post_id intact for context
      created_by: user_id, // Reset to the current user_id
    }); // Reset local state
    resetForm(); // Reset global state
    document.getElementById("add_comment").close(); // Close the modal after submission
  };

  return (
    <>
      <dialog id="add_comment" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add New Comment</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              name="content"
              placeholder="Write your comment here..."
              value={localFormData.content}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Add Comment
            </button>
          </form>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("add_comment").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddCommentModal;
