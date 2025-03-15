import { CirclePlus, EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useComments } from "../store/useComments";

function CommentCard({ comment, post_id }) {
  const { deleteComment } = useComments();
  const user = JSON.parse(localStorage.getItem("user")); // Get user object
  const user_id = user ? user.user_id : null;

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="card-body p-4">
        {/* Comment Content */}
        <p className="text-base text-gray-600 mb-1">{comment.content}</p>

        {/* Comment details */}
        <div className="text-gray-500 text-base mb-1">
          <div>
            <strong className="font-medium text-gray-800">Created At:</strong>{" "}
            {new Date(comment.created_at).toLocaleDateString()}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Created By:</strong>{" "}
            {comment.user_name}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-1 space-x-4">
          {/* Show Edit & Delete buttons only if the user created the comment */}
          {comment.user_id === user_id && (
            <>
              {/* Edit Button */}
              <Link
                to={``}
                className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <EditIcon className="size-4" />
              </Link>

              {/* Delete Button */}
              <button
                className="flex items-center justify-center bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                onClick={() => deleteComment(comment.comment_id, post_id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
