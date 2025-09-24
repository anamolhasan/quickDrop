"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios(`${apiUrl}/feedback`)
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, [apiUrl]);

  return (
    <div className="overflow-x-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <table className="table-auto w-full border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
        <thead>
          <tr className="uppercase text-left">
            <th className="py-3 px-4 text-gray-700 dark:text-gray-300">User</th>
            <th className="py-3 px-4 text-gray-700 dark:text-gray-300">Feedback</th>
            <th className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, idx) => (
              <tr
                key={fb._id}
                className={`transition-colors duration-200 ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                } hover:shadow-md hover:scale-[1.01] transform`}
              >
                <td className="py-4 px-4 flex items-center gap-3 text-gray-800 dark:text-gray-100">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        src={
                          fb.avatar ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt={fb.name}
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{fb.name}</div>
                    <div className="text-sm opacity-70">{fb.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700 dark:text-gray-200">{fb.feedback}</td>
                <td className="py-4 px-4 text-center">
                  <button className="btn btn-error btn-sm hover:btn-warning transition-colors duration-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                No feedback found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserFeedback;
