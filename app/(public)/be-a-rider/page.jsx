'use client'

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const bdDivisions = {
  Dhaka: [
    "Dhaka", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj",
    "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Faridpur", "Gopalganj", "Madaripur"
  ],
  Chattogram: [
    "Chattogram", "Cox’s Bazar", "Rangamati", "Bandarban", "Khagrachhari",
    "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Cumilla", "Chandpur"
  ],
  Khulna: [
    "Khulna", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia",
    "Magura", "Meherpur", "Narail", "Satkhira"
  ],
  Rajshahi: [
    "Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj"
  ],
  Rangpur: [
    "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat",
    "Nilphamari", "Panchagarh", "Thakurgaon"
  ],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Barishal: ["Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Barguna"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

export default function BecomeRiderForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/riders`, {
        ...formData,
        name: session?.user?.name,
        email: session?.user?.email,
        status: "pending",
      });

      if (res.data.success) {
        toast.success("✅ Application submitted! Status: Pending");
        reset();
        setSelectedDivision("");
      } else {
        toast.error(res.data.message || "❌ Failed to submit");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
          Become a <span className="text-yellow-500">Rider</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Fill in the details below to apply as a rider. Our team will review your
          application and get back to you soon.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              value={session?.user?.name || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Division (Region)
            </label>
            <select
              {...register("division", { required: true })}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            >
              <option value="">Select Division</option>
              {Object.keys(bdDivisions).map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              District
            </label>
            <select
              {...register("district", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            >
              <option value="">Select District</option>
              {selectedDivision &&
                bdDivisions[selectedDivision].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: true })}
              placeholder="Enter your address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* NID / Driving License */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              NID / Driving License
            </label>
            <input
              type="text"
              {...register("nid", { required: true })}
              placeholder="Enter NID / License number"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Vehicle Type
            </label>
            <select
              {...register("vehicleType", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            >
              <option value="">Select Vehicle</option>
              <option value="Bike">Bike</option>
              <option value="Cycle">Cycle</option>
              <option value="Car">Car</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Experience
            </label>
            <input
              type="text"
              {...register("experience")}
              placeholder="e.g. 2 years"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl shadow-md transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
}
