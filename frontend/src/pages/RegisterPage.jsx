import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    causes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(
      formData.name,
      formData.email,
      formData.password,
      formData.skills,
      formData.causes
    );
    navigate("/login"); // Redirect to profile after registration
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="skills"
          placeholder="Skills"
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
        />
        <input
          name="causes"
          placeholder="Interested Areas"
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
