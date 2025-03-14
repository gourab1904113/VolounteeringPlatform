import { CirclePlus, EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useEvents } from "../store/useEvents";

function EventCard({ event }) {
  const { deleteEvent, joinEvent } = useEvents();

  const user = JSON.parse(localStorage.getItem("user")); // Get user object
  const user_id = user ? user.user_id : null;
  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="card-body p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          {event.title}
        </h2>

        {/* Description */}
        <p className="text-base text-gray-600 mb-1">{event.description}</p>

        {/* Event details */}
        <div className="text-gray-500 text-base mb-1">
          <div>
            <strong className="font-medium text-gray-800">Date:</strong>{" "}
            {new Date(event.event_date).toLocaleDateString()}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Time:</strong>{" "}
            {new Date(`1970-01-01T${event.event_time}`).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Location:</strong>{" "}
            {event.location}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Category:</strong>{" "}
            {event.category}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Created At:</strong>{" "}
            {new Date(event.created_at).toLocaleDateString()}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Created By:</strong>{" "}
            {event.created_by_name}
          </div>
        </div>

        {/* Actions */}

        <div className="flex justify-end mt-1 space-x-4">
          {/* Delete Button */}
          <button
            className="flex items-center justify-center bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-700 transition-colors"
            onClick={() => joinEvent(event.event_id, user_id)}
          >
            <CirclePlus className="size-4" />
          </button>
          {/* Edit Button */}
          <Link
            to={`/event/${event.event_id}`}
            className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            <EditIcon className="size-4" />
          </Link>

          {/* Delete Button */}
          <button
            className="flex items-center justify-center bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            onClick={() => deleteEvent(event.event_id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
