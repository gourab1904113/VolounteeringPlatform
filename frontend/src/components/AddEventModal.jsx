import React, { useState } from "react";
import { useEvents } from "../store/useEvents";

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
    await addEvent(e, localFormData);
    setLocalFormData({
      title: "",
      description: "",
      event_date: "",
      event_time: "",
      location: "",
      category: "",
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
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={localFormData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={localFormData.category}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
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
