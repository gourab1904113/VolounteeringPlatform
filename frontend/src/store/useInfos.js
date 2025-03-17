import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useInfos = create((set, get) => ({
  infos: [],
  loading: false,
  error: null,

  // Fetch Comments for a specific post
  fetchInfos: async (team_id) => {
    set({ infos: [], loading: true });
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/teaminfo/${team_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ infos: response.data.data, error: null });
    } catch (error) {
      set({ error: "Something went wrong while fetching comments" });
    } finally {
      set({ loading: false });
    }
  },
}));
