import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfileModal"; // Import the modal component

export default function ProfilePage() {
  const { user, fetchUserProfile, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if no user is found
    } else {
      fetchUserProfile(); // Fetch user profile when user exists
    }
  }, [user, fetchUserProfile, navigate]);

  useEffect(() => {
    if (user) {
      setIsLoading(false); // Set loading to false after user data is fetched
    }
  }, [user]);

  const openEditModal = () => {
    document.getElementById("editProfileModal").showModal();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        {/* Show loading indicator while waiting for user data */}
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="text-center mb-4">
              <p className="font-semibold">Name: {user.name}</p>
              <p className="font-semibold">Skills: {user.skills}</p>
              <p className="font-semibold">Interested Areas: {user.causes}</p>
            </div>

            {/* Edit Button */}
            <button className="btn btn-primary w-full" onClick={openEditModal}>
              Edit Profile
            </button>
          </>
        )}

        {/* Logout Button */}
        <button onClick={logout} className="btn btn-secondary w-full mt-4">
          Logout
        </button>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal user={user} updateProfile={updateProfile} />
    </div>
  );
}
