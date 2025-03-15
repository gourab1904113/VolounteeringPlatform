import React, { useState } from "react";

import toast from "react-hot-toast";
import { usePosts } from "../store/usePosts";

function AddPostModal() {
  const { addPost, setFormData, formData, resetForm } = usePosts();
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
      created_by: user_id,
    };

    console.log(updatedFormData);

    // Pass the updated form data to addPost
    await addPost(e, updatedFormData);

    setLocalFormData({
      title: "",
      content: "",
      created_by: user_id, // Ensure user_id remains
    });

    resetForm(); // Reset global state
    document.getElementById("post_modal").close(); // Close modal
  };

  return (
    <>
      <dialog id="post_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">Add New Post</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={localFormData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="content"
              placeholder="Content"
              value={localFormData.content}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Add Post
            </button>
          </form>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("post_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddPostModal;
