import React, { useEffect } from "react";
import { CirclePlus, RefreshCw, CalendarX } from "lucide-react";
import TeamCard from "./TeamCard"; // Updated: Changed from EventCard to PostCard
import { useTeams } from "../store/useTeams";
import AddTeamModal from "../components/AddTeamModal";

const Teams = () => {
  const { teams, loading, error, fetchTeams } = useTeams(); // Updated: Use posts store

  // Fetch posts on component mount
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:scale-105 transition-transform duration-300"
          onClick={() => document.getElementById("team_modal").showModal()}
        >
          <CirclePlus className="size-5" />
          Create Team
        </button>
        <button
          className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          onClick={fetchTeams}
        >
          <RefreshCw className="size-6 text-blue-600" />
        </button>
      </div>

      <AddTeamModal />

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-8 text-white bg-red-500 p-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* No Posts Found - Colorful Section */}
      {teams.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <CalendarX className="size-16 text-white drop-shadow-md" />
          <p className="text-lg font-bold mt-4">No teams found</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.team_id} team={team} /> // Updated: Changed event_id to post_id
          ))}
        </div>
      )}
    </main>
  );
};

export default Teams;
