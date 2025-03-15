import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const usePosts = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  formData: {
    title: "",
    content: "",
    created_by: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({
      formData: {
        title: "",
        content: "",
        created_by: "",
      },
    }),

  addPost: async (e, formData) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.post(`${BASE_URL}/api/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchPosts();
      get().resetForm();
      toast.success("Post Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchPosts: async () => {
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ posts: response.data.data, error: null });
    } catch (error) {
      set({ error: "Something went wrong while fetching posts" });
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (post_id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/posts/${post_id}`);
      set((prev) => ({
        posts: prev.posts.filter((post) => post.post_id !== post_id),
      }));
      toast.success("Successfully Deleted!");
    } catch (error) {
      console.log("Error in deleting post", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
