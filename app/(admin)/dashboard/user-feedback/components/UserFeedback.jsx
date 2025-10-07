"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Trash2, MessageCircle } from "lucide-react"; // Added MessageCircle for visual header

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) fetchFeedbacks();
  }, [apiUrl, session]);

  const fetchFeedbacks = () => {
    // Assuming API requires a simple GET request for feedback list
    axios
      .get(`${apiUrl}/feedback`)
      .then((res) => setFeedbacks(res.data))
      .catch(() => toast.error("Failed to load feedback."));
  };

  const handleDelete = async (id) => {
    if (!session?.user?.role === "admin") {
      toast.error("Unauthorized access.");
      return;
    }
    try {
      await axios.delete(`${apiUrl}/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
      toast.success("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("Failed to delete feedback.");
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme */}
        <div className="flex items-center gap-3 mb-8">
            <MessageCircle size={32} className="text-yellow-600 dark:text-yellow-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Feedback</h1>
        </div>
        
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            {/* Table Head (Themed) */}
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="uppercase text-left text-xs font-semibold tracking-wider">
                <th className="py-4 px-6 text-gray-700 dark:text-gray-300">User</th>
                <th className="py-4 px-6 text-gray-700 dark:text-gray-300">Feedback Message</th>
                {session?.user?.role === "admin" && (
                  <th className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">Action</th>
                )}
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, idx) => (
                  <tr
                    key={fb._id}
                    className={`transition-all duration-300 transform 
                      ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                      hover:bg-yellow-50/70 dark:hover:bg-gray-800/70 hover:shadow-lg`}
                  >
                    {/* User Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {/* Avatar styling aligned with previous components */}
                        <div className="flex-shrink-0 w-12 h-12 relative rounded-full overflow-hidden border-2 border-yellow-500 shadow-md">
                          <Image
                            src={
                              fb.avatar || fb.image || "https://i.ibb.co/2n8qPkw/default-avatar.png" 
                            }
                            alt={fb.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{fb.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fb.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Feedback Message */}
                    <td className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300">
                      {fb.feedback}
                    </td>
                    
                    {/* Action (Admin Only) */}
                    {session?.user?.role === "admin" && (
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleDelete(fb._id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 
                            bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold 
                            rounded-xl shadow-lg shadow-red-500/30 
                            hover:from-red-600 hover:to-red-700 transition-all duration-300 
                            transform hover:scale-[1.02] active:scale-95 text-sm"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={session?.user?.role === "admin" ? 3 : 2}
                    className="text-center py-10 text-lg font-medium text-gray-500 dark:text-gray-400"
                  >
                    No user feedback has been submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;