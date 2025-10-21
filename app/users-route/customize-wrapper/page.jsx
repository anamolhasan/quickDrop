


"use client";
import { useState } from "react";

export default function WrapperPage() {
  const [prompt, setPrompt] = useState(""); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const presets = [
    "Birthday wrapper with balloons and cake",
    "Christmas wrapper with gifts and snow",
    "Wedding wrapper with flowers and rings",
    "Anniversary wrapper with hearts and candles",
    "New Year wrapper with fireworks and confetti"
  ];

  const selectPreset = (preset) => {
    setPrompt(preset);
  };

  const generateWrapper = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-wrapper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setImage(data.image);
      setImageLoading(true);
    } catch (err) {
      console.error(err);
      alert("Error generating wrapper");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎁 Custom Wrapper Generator</h1>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Choose a wrapper type:</h2>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => selectPreset(preset)}
              className={`px-3 py-1 rounded border ${prompt === preset ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {preset.split(" wrapper")[0]} {/* Short label */}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Or write your own wrapper description"
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={generateWrapper}
        className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Wrapper"}
      </button>

      {image && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Your Generated Wrapper:</h2>
          {imageLoading && (
            <div className="flex justify-center items-center mb-2">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          )}
          <img
            src={image}
            alt="Generated Wrapper"
            className="border shadow-lg max-w-full rounded"
            onLoad={() => setImageLoading(false)}
          />
        </div>
      )}
    </div>
  );
}
