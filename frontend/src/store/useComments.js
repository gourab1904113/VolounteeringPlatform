import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useComments = create((set, get) => ({
  comments: [],
  loading: false,
  error: null,

  formData: {
    content: "",
    post_id: "", // To associate comment with a specific post
    created_by: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({
      formData: {
        content: "",
        post_id: "",
        created_by: "",
      },
    }),

  // Add Comment
  addComment: async (e, formData) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.post(`${BASE_URL}/api/comments`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchComments(formData.post_id); // Fetch updated comments for the specific post
      get().resetForm();
      toast.success("Comment Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  // Fetch Comments for a specific post
  fetchComments: async (post_id) => {
    set({ comments: [], loading: true });
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/comments/${post_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ comments: response.data.data, error: null });
    } catch (error) {
      set({ error: "Something went wrong while fetching comments" });
    } finally {
      set({ loading: false });
    }
  },

  // Delete a Comment
  deleteComment: async (comment_id, post_id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/comments/${comment_id}`);
      set((prev) => ({
        comments: prev.comments.filter(
          (comment) => comment.comment_id !== comment_id
        ),
      }));
      toast.success("Comment Deleted Successfully");
    } catch (error) {
      console.log("Error in deleting comment", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
