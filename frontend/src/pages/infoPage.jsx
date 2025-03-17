import React, { useEffect } from "react";
import { useInfos } from "../store/useInfos";
import { useParams } from "react-router-dom"; // Import useParams
import { CirclePlus, RefreshCw, CalendarX } from "lucide-react";
import CommentCard from "./CommentCard"; // Use CommentCard instead of EventCard
import AddCommentModal from "../components/AddCommentModal"; // Modal for adding comments

const infoPage = () => {
  const { infos, loading, error, fetchInfos } = useInfos();
  const { team_id } = useParams();

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchInfos(team_id); // Fetch comments for the specific post
  }, [fetchInfos, team_id]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          onClick={() => fetchInfos(team_id)} // Refresh comments
        >
          <RefreshCw className="size-6 text-blue-600" />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-8 text-white bg-red-500 p-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* No Comments Found - Colorful Section */}
      {infos.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <CalendarX className="size-16 text-white drop-shadow-md" />
          <p className="text-lg font-bold mt-4">No Infos found</p>
        </div>
      )}

      <div> Users:</div>
      <br />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg text-blue-600" />
        </div>
      ) : (
        //md:grid-cols-2 lg:grid-cols-3

        <div className="grid grid-cols-1  gap-6">
          {infos.map((info) => (
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              <div className="card-body p-4">
                {/* Comment Content */}
                <p className="text-base text-gray-600 mb-1">
                  Name: {info.name}
                </p>
                <p className="text-base text-gray-600 mb-1">
                  Email:{info.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default infoPage;
