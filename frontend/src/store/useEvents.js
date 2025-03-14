import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useEvents = create((set, get) => ({
  events: [],
  loading: false,
  error: null,

  formData: {
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    location: "",
    category: "",
    created_by: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () =>
    set({
      formData: {
        title: "",
        description: "",
        event_date: "",
        event_time: "",
        location: "",
        category: "",
        created_by: "",
      },
    }),

  addEvent: async (e, formData) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      // Send formData including created_by to the API
      await axios.post(`${BASE_URL}/api/events`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await get().fetchEvents();
      get().resetForm();
      toast.success("Event Added Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchEvents: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/events`);
      set({ events: response.data.data, error: null });
    } catch (error) {
      set({ error: "Something went wrong while fetching events" });
    } finally {
      set({ loading: false });
    }
  },

  deleteEvent: async (event_id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/events/${event_id}`);
      set((prev) => ({
        events: prev.events.filter((event) => event.event_id !== event_id),
      }));
      toast.success("Successfully Deleted!");
    } catch (error) {
      console.log("Error in delete Event", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  joinEvent: async (event_id, user_id) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      console.log(token);
      if (!token) {
        throw new Error("User not authenticated");
      }
      await axios.post(
        `${BASE_URL}/api/join-event`,
        { user_id, event_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await get().fetchEvents(); // Refresh events after joining
      toast.success("Successfully joined the event!");
    } catch (error) {
      console.error("Error joining event:", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
