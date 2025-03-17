import React, { useEffect, useState } from "react";
import { useEvents } from "../store/useEvents";
import { CirclePlus, RefreshCw, CalendarX } from "lucide-react";
import EventCard from "./EventCard";
import AddEventModal from "../components/AddEventModal";

const HomePage = () => {
  const { events, loading, error, fetchEvents } = useEvents();

  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filter events based on selected category and location
  const filteredEvents = events.filter((event) => {
    return (
      (selectedCategory === "" || event.category === selectedCategory) &&
      (selectedLocation === "" || event.location === selectedLocation)
    );
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:scale-105 transition-transform duration-300"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          <CirclePlus className="size-5" />
          Add Event
        </button>
        <button
          className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          onClick={fetchEvents}
        >
          <RefreshCw className="size-6 text-blue-600" />
        </button>
      </div>

      <AddEventModal />

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full md:w-1/2"
        >
          <option value="">All Categories</option>
          <option value="Conference">Conference</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Networking">Networking</option>
          <option value="Hackathon">Hackathon</option>
        </select>

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="select select-bordered w-full md:w-1/2"
        >
          <option value="">All Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Boston">Boston</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-8 text-white bg-red-500 p-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* No Events Found */}
      {filteredEvents.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <CalendarX className="size-16 text-white drop-shadow-md" />
          <p className="text-lg font-bold mt-4">No events found</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
