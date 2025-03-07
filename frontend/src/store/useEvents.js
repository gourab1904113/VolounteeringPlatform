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
  },

  ///set form data what user pass
  setFormData: (formData) => set({ formData }),
  ///reset the form
  resetForm: () =>
    set({
      formData: {
        title: "",
        description: "",
        event_date: "",
        event_time: "",
        location: "",
        category: "",
      },
    }),

  addEvent: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      ///get form data

      const { formData } = get();
      ///send data to database
      await axios.post(`${BASE_URL}/api/events`, formData);
      await get().fetchEvents();
      get().resetForm();
      toast.success("Event Added Successfully");

      //todo: close
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchEvents: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/events`);
      ///data is passing as response
      set({ events: response.data.data, error: null });
    } catch (error) {
      set({ error: "something wrong to get Events" });
    } finally {
      set({ loading: false });
    }
  },

  deleteEvent: async (event_id) => {
    set({ loading: true });

    try {
      await axios.delete(`${BASE_URL}/api/events/${event_id}`);
      set((prev) => ({
        // filter Events
        events: prev.events.filter((event) => event.event_id !== event_id),
      }));
      toast.success("Successfully Deleted!");
    } catch (error) {
      console.log("Error in delete Event", error);
      toast.error("Something went Wrong");
    } finally {
      set({ loading: false }); // Ensure loading stops
    }
  },
}));
