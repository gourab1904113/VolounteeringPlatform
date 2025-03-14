import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000/api";

export const useAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ error: error.response?.data?.message });
    } finally {
      set({ loading: false });
    }
  },

  register: async (name, email, password, skills, causes) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
        skills,
        causes,
      });
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      set({ error: error.response?.data?.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.log("Error fetching profile:", error);
      toast.error("Failed to fetch profile");
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (name, skills, causes) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${BASE_URL}/users/profile`,
        { name, skills, causes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({ user: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
    toast.success("Logged out successfully");
  },
}));
