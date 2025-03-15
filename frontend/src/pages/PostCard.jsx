import { EditIcon, Trash2Icon, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { usePosts } from "../store/usePosts";

function PostCard({ post }) {
  const { deletePost } = usePosts();

  const user = JSON.parse(localStorage.getItem("user")); // Get user object
  const user_id = user ? user.user_id : null;

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="card-body p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {post.title}
        </h2>

        {/* Content */}
        <p className="text-base text-gray-600 mb-2">{post.content}</p>

        {/* Post Metadata */}
        <div className="text-gray-500 text-sm mb-2">
          <div>
            <strong className="font-medium text-gray-800">Created By:</strong>{" "}
            {post.created_by_name}
          </div>
          <div>
            <strong className="font-medium text-gray-800">Created At:</strong>{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-2 space-x-4">
          {/* Comment Button (Link to Post Comments Page) */}
          <Link
            to={`/post/${post.post_id}/comments`}
            className="flex items-center justify-center bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="size-4" />
          </Link>

          {/* Edit & Delete Buttons (only for post creator) */}
          {post.user_id === user_id && (
            <>
              <Link
                to={`/post/${post.post_id}`}
                className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <EditIcon className="size-4" />
              </Link>

              <button
                className="flex items-center justify-center bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                onClick={() => deletePost(post.post_id)}
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

export default PostCard;
