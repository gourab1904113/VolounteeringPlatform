import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useTeams = create((set, get) => ({
  teams: [],
  loading: false,
  error: null,

  formData: {
    title: "",
    content: "",
    type: "",
    created_by: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({
      formData: {
        title: "",
        content: "",
        type: "",
        created_by: "",
      },
    }),

  addTeam: async (e, formData) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.post(`${BASE_URL}/api/teams`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await get().fetchTeams();
      get().resetForm();
      toast.success("Team Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchTeams: async () => {
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ teams: response.data.data, error: null });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  deleteTeam: async (team_id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/teams/${team_id}`);
      set((prev) => ({
        teams: prev.teams.filter((team) => team.team_id !== team_id),
      }));
      toast.success("Successfully Deleted!");
    } catch (error) {
      console.log("Error in deleting post", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  joinTeam: async (team_id, user_id) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      console.log(token);
      if (!token) {
        throw new Error("User not authenticated");
      }
      await axios.post(
        `${BASE_URL}/api/join-team`,
        { user_id, team_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Successfully joined the team!");
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  joinTeamEmail: async (team_id, email) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      console.log(token);
      if (!token) {
        throw new Error("User not authenticated");
      }
      await axios.post(
        `${BASE_URL}/api/join-team-email`,
        { email, team_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Successfully joined the team!");
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
