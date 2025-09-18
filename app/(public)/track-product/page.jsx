"use client";
import { useState } from "react";

export default function TrackProduct() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      alert("Please enter your tracking ID.");
      return;
    }
    // Simulated tracking data
    setResult({
      status: "In Transit",
      location: "Dhaka Hub",
      expected: "2025-09-20",
    });
  };

  return (
    <section
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{ backgroundImage: "url('/bg-courier.jpg')" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Track Your Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            className="flex-1 border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="bg-amber-500 cursor-pointer text-white px-5 py-2 rounded-md "
          >
            Track
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-white p-4 rounded-md border text-gray-700">
            <h2 className="font-semibold mb-2">Tracking Result</h2>
            <p>
              <span className="font-medium">Status:</span> {result.status}
            </p>
            <p>
              <span className="font-medium">Location:</span> {result.location}
            </p>
            <p>
              <span className="font-medium">Expected Delivery:</span>{" "}
              {result.expected}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
