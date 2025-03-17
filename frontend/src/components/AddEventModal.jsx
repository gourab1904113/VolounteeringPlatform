import React, { useState } from "react";
import { useEvents } from "../store/useEvents";
import toast from "react-hot-toast";

function AddEventModal() {
  const { addEvent, setFormData, formData, resetForm } = useEvents();
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
    };

    // Pass the updated form data to addEvent
    await addEvent(e, updatedFormData);
    setLocalFormData({
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      location: "",
      category: "",
      created_by: user_id, // This should be reset to the current user_id
    }); // Reset local state
    resetForm(); // Reset global state
    document.getElementById("my_modal_4").close(); // Close the modal after submission
  };

  return (
    <>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add New Event</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              name="description"
              placeholder="Description"
              value={localFormData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <input
              type="date"
              name="event_date"
              value={localFormData.event_date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="time"
              name="event_time"
              value={localFormData.event_time}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <select
              name="location"
              value={localFormData.location}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Boston">Boston</option>
            </select>
            <select
              name="category"
              value={localFormData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Networking">Networking</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Workshop">Workshop</option>
            </select>
            <button type="submit" className="btn btn-primary w-full">
              Add Event
            </button>
          </form>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_4").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddEventModal;
