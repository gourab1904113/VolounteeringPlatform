import {
  EditIcon,
  Trash2Icon,
  MessageCircle,
  CirclePlus,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useTeams } from "../store/useTeams";

function TeamCard({ team }) {
  const { deleteTeam, joinTeam, joinTeamEmail } = useTeams();
  const user = JSON.parse(localStorage.getItem("user")); // Get user object
  const user_id = user ? user.user_id : null;

  const [email, setEmail] = useState("");

  const handleAddEmail = () => {
    joinTeamEmail(team.team_id, email);
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="card-body p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {team.title}
        </h2>

        {/* Content */}
        <p className="text-base text-gray-600 mb-2">{team.content}</p>

        {/* Post Metadata */}
        <div className="text-gray-500 text-sm mb-2">
          <div>
            <strong className="font-medium text-gray-800">Created By:</strong>{" "}
            {team.created_by_name}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Type:</strong>{" "}
            {team.type}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Created At:</strong>{" "}
            {new Date(team.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Email Input and Add Button */}

        {team.user_id === user_id && team.type === "private" && (
          <div className="mb-4">
            <h3>Add User:</h3>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="mt-2 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
              onClick={handleAddEmail}
            >
              Add
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end mt-2 space-x-4">
          {/* Comment Button (Link to Post Comments Page) */}
          <Link
            to={`/teams/${team.team_id}/info`}
            className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <Eye className="size-5" />
          </Link>

          {team.type === "public" && (
            <button
              className="flex items-center justify-center bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-700 transition-colors"
              onClick={() => joinTeam(team.team_id, user_id)}
            >
              <CirclePlus className="size-5" />
            </button>
          )}

          {/* Edit & Delete Buttons (only for post creator) */}
          {team.user_id === user_id && (
            <>
              <Link
                to={``}
                className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <EditIcon className="size-5" />
              </Link>

              <button
                className="flex items-center justify-center bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                onClick={() => deleteTeam(team.team_id)}
              >
                <Trash2Icon className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
