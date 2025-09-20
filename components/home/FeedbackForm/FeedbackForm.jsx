// const FeedbackForm = () => {
//   // const onSubmit = (data) => {
//   //   console.log("User Feedback:", data);
//   //   alert("✅ Thank you for your feedback!");
//   //   reset(); // form reset
//   // };

//   return (
//     <div className="  py-16 px-4 bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-md mx-auto    shadow-lg rounded-2xl p-6 ">
//         <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
//           Your Feedback
//         </h2>
//         <form className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Your Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             />
//           </div>

//           {/* Feedback */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Your Feedback
//             </label>
//             <textarea
//               placeholder="Write your feedback..."
//               rows="4"
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-amber-500 w-full cursor-pointer text-white font-medium rounded-md px-4 py-2"
//           >
//             Submit Feedback
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FeedbackForm;




import React from "react";

const FeedbackForm = () => {
  return (
    <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          We Value Your <span className="text-yellow-500">Feedback</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Your opinions help us improve our services. Please share your thoughts below.
        </p>

        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Your Feedback
            </label>
            <textarea
              placeholder="Write your feedback..."
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
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
