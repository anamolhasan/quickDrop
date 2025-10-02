'use client'

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const FeedbackForm = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();

  const handleFeedback = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const FeedbackForm = Object.fromEntries(formData.entries());

    // Include avatar from session if available
    if (session?.user?.image) FeedbackForm.avatar = session.user.image;

    axios.post(`${apiUrl}/feedback`, FeedbackForm)
      .then(() => {
        toast.success('Feedback submitted! 👍');
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to submit feedback');
      });

    form.reset();
  }

  return (
    <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          We Value Your <span className="text-yellow-500">Feedback</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Your opinions help us improve our services. Please share your thoughts below.
        </p>

        <form onSubmit={handleFeedback} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={session?.user?.name || ''}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={session?.user?.email || ''}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
              required
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Your Feedback
            </label>
            <textarea
              name="feedback"
              placeholder="Write your feedback..."
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-gray-900 font-semibold rounded-xl shadow-md transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
