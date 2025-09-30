"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ParcelSendForm() {
  const { data: session } = useSession();

  const weightOptionalTypes = ["Documents", "Clothes", "Other", "Electronics"];

  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    receiverName: "",
    receiverPhone: "",
    pickupAddress: "",
    deliveryAddress: "",
    parcelWeight: "",
    parcelType: "",
    note: "",
  });

  // Set default sender info if logged in
  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        senderName: session.user.name || "",
        senderEmail: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If parcelType changes, clear weight if it's optional
    if (name === "parcelType" && weightOptionalTypes.includes(value)) {
      setForm((prev) => ({ ...prev, parcelType: value, parcelWeight: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parcel Submitted:", form);
    alert("📦 Parcel send request submitted successfully!");
    setForm({
      senderName: session?.user?.name || "",
      senderEmail: session?.user?.email || "",
      senderPhone: "",
      receiverName: "",
      receiverPhone: "",
      pickupAddress: "",
      deliveryAddress: "",
      parcelWeight: "",
      parcelType: "",
      note: "",
    });
  };

  return (
    <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <section className="max-w-2xl mx-auto my-10 p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
          📦 Send a Parcel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Sender Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Sender Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="senderName"
                value={form.senderName}
                onChange={handleChange}
                placeholder="Sender Full Name"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="email"
                name="senderEmail"
                value={form.senderEmail}
                onChange={handleChange}
                placeholder="Sender Email"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="text"
                name="senderPhone"
                value={form.senderPhone}
                onChange={handleChange}
                placeholder="Sender Phone"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none md:col-span-2"
                required
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Receiver Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                placeholder="Receiver Full Name"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="text"
                name="receiverPhone"
                value={form.receiverPhone}
                onChange={handleChange}
                placeholder="Receiver Phone"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Parcel Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Parcel Details
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={handleChange}
                placeholder="Pickup Address"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />
              <input
                type="text"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                placeholder="Delivery Address"
                className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                required
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="parcelWeight"
                  value={form.parcelWeight}
                  onChange={handleChange}
                  placeholder="Weight (kg)"
                  className={`w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${
                    weightOptionalTypes.includes(form.parcelType)
                      ? "bg-gray-200 cursor-not-allowed"
                      : ""
                  }`}
                  required={!weightOptionalTypes.includes(form.parcelType)}
                  disabled={weightOptionalTypes.includes(form.parcelType)}
                />
                <select
                  name="parcelType"
                  value={form.parcelType}
                  onChange={handleChange}
                  className="w-full border bg-black px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
                  required
                >
                  <option value="">Select Parcel Type</option>
                  <option value="Documents">Documents</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Fragile">Fragile Item</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Conditionally render additional notes */}

                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Additional Notes (optional)"
                  className="w-full border px-4 py-3 rounded-md min-h-[100px] focus:ring-2 focus:ring-amber-500 outline-none"
                />
      
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 w-full text-white font-semibold rounded-lg px-6 py-3 transition duration-300"
          >
            Send Parcel
          </button>
        </form>
      </section>
    </div>
  );
}
