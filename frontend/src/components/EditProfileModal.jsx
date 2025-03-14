import React, { useState, useEffect } from "react";

function EditProfileModal({ user, updateProfile }) {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    causes: "",
  });

  // Reset form data when the modal opens
  useEffect(() => {
    // Reset fields to empty on modal open
    setFormData({
      name: "",
      skills: "",
      causes: "",
    });
  }, []);

  const handleChange = (e) => {
    const updatedForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass the entered form data to updateProfile
    await updateProfile(formData.name, formData.skills, formData.causes);
    document.getElementById("editProfileModal").close(); // Close the modal after submission
  };

  return (
    <>
      <dialog id="editProfileModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="causes"
              placeholder="Causes"
              value={formData.causes}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Update Profile
            </button>
          </form>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                document.getElementById("editProfileModal").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default EditProfileModal;
