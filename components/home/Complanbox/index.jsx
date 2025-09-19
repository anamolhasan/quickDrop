"use client";
import { useState } from "react";

const categories = [
  "Service Issue",
  "Delivery Delay",
  "Payment Problem",
  "Other",
];

export default function ComplaintBox() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    details: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    alert("Complaint submitted successfully!");
    setForm({ name: "", email: "", subject: "", details: "", category: "" });
  };

  return (
    <div className="py-16 px-4  bg-gray-50 dark:bg-gray-900">
      <div className=" border-t-1 border-gray-500 w-11/12 mx-auto"></div>
      <section className="max-w-lg  mx-auto my-10 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          Submit a Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Complaint Details"
            className="w-full border px-3 py-2 rounded-md min-h-[100px]"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-amber-500 w-full cursor-pointer text-white font-medium rounded-md px-4 py-2"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
