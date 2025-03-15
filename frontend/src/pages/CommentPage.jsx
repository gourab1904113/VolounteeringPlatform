import React, { useEffect } from "react";
import { useComments } from "../store/useComments";
import { useParams } from "react-router-dom"; // Import useParams
import { CirclePlus, RefreshCw, CalendarX } from "lucide-react";
import CommentCard from "./CommentCard"; // Use CommentCard instead of EventCard
import AddCommentModal from "../components/AddCommentModal"; // Modal for adding comments

const CommentPage = () => {
  const { comments, loading, error, fetchComments } = useComments();
  const { post_id } = useParams();

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments(post_id); // Fetch comments for the specific post
  }, [fetchComments, post_id]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:scale-105 transition-transform duration-300"
          onClick={() => document.getElementById("add_comment").showModal()}
        >
          <CirclePlus className="size-5" />
          Add Comment
        </button>
        <button
          className="bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition duration-300"
          onClick={() => fetchComments(post_id)} // Refresh comments
        >
          <RefreshCw className="size-6 text-blue-600" />
        </button>
      </div>

      <AddCommentModal post_id={post_id} />

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-8 text-white bg-red-500 p-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* No Comments Found - Colorful Section */}
      {comments.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-xl shadow-lg">
          <CalendarX className="size-16 text-white drop-shadow-md" />
          <p className="text-lg font-bold mt-4">No comments found</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg text-blue-600" />
        </div>
      ) : (
        //md:grid-cols-2 lg:grid-cols-3
        <div className="grid grid-cols-1  gap-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              post_id={post_id}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default CommentPage;
