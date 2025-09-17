const FeedbackForm = () => {
  // const onSubmit = (data) => {
  //   console.log("User Feedback:", data);
  //   alert("✅ Thank you for your feedback!");
  //   reset(); // form reset
  // };

  return (
    <div className="  py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto    shadow-lg rounded-2xl p-6 ">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Your Feedback
        </h2>
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Feedback
            </label>
            <textarea
              placeholder="Write your feedback..."
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-amber-500 w-full cursor-pointer text-white font-medium rounded-md px-4 py-2"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
