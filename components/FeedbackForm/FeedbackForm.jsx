
const FeedbackForm = () => {

  // const onSubmit = (data) => {
  //   console.log("User Feedback:", data);
  //   alert("✅ Thank you for your feedback!");
  //   reset(); // form reset
  // };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Feedback Section
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
          <label className="block text-sm font-medium mb-1">Your Feedback</label>
          <textarea
           
            placeholder="Write your feedback..."
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
