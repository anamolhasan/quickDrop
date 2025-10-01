// "use client";

// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

// export default function ParcelSendForm() {
//   const { data: session } = useSession();

//   const weightOptionalTypes = ["Documents", "Clothes", "Other", "Electronics"];

//   const [form, setForm] = useState({
//     senderName: "",
//     senderEmail: "",
//     senderPhone: "",
//     receiverName: "",
//     receiverPhone: "",
//     pickupAddress: "",
//     deliveryAddress: "",
//     parcelWeight: "",
//     parcelType: "",
//     note: "",
//   });

//   // Set default sender info if logged in
//   useEffect(() => {
//     if (session?.user) {
//       setForm((prev) => ({
//         ...prev,
//         senderName: session.user.name || "",
//         senderEmail: session.user.email || "",
//       }));
//     }
//   }, [session]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // If parcelType changes, clear weight if it's optional
//     if (name === "parcelType" && weightOptionalTypes.includes(value)) {
//       setForm((prev) => ({ ...prev, parcelType: value, parcelWeight: "" }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Parcel Submitted:", form);
//     alert("📦 Parcel send request submitted successfully!");
//     setForm({
//       senderName: session?.user?.name || "",
//       senderEmail: session?.user?.email || "",
//       senderPhone: "",
//       receiverName: "",
//       receiverPhone: "",
//       pickupAddress: "",
//       deliveryAddress: "",
//       parcelWeight: "",
//       parcelType: "",
//       note: "",
//     });
//   };

//   return (
//     <div className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
//       <section className="max-w-2xl mx-auto my-10 p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800">
//         <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
//           📦 Send a Parcel
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Sender Info */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
//               Sender Information
//             </h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="senderName"
//                 value={form.senderName}
//                 onChange={handleChange}
//                 placeholder="Sender Full Name"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                 required
//               />
//               <input
//                 type="email"
//                 name="senderEmail"
//                 value={form.senderEmail}
//                 onChange={handleChange}
//                 placeholder="Sender Email"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                 required
//               />
//               <input
//                 type="text"
//                 name="senderPhone"
//                 value={form.senderPhone}
//                 onChange={handleChange}
//                 placeholder="Sender Phone"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none md:col-span-2"
//                 required
//               />
//             </div>
//           </div>

//           {/* Receiver Info */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
//               Receiver Information
//             </h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="receiverName"
//                 value={form.receiverName}
//                 onChange={handleChange}
//                 placeholder="Receiver Full Name"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                 required
//               />
//               <input
//                 type="text"
//                 name="receiverPhone"
//                 value={form.receiverPhone}
//                 onChange={handleChange}
//                 placeholder="Receiver Phone"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                 required
//               />
//             </div>
//           </div>

//           {/* Parcel Details */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
//               Parcel Details
//             </h3>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="pickupAddress"
//                 value={form.pickupAddress}
//                 onChange={handleChange}
//                 placeholder="Pickup Address"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                 required
//               />
//               <input
//                 type="text"
//                 name="deliveryAddress"
//                 value={form.deliveryAddress}
//                 onChange={handleChange}
//                 placeholder="Delivery Address"
//                 className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                 required
//               />

//               <div className="grid md:grid-cols-2 gap-4">
//                 <input
//                   type="number"
//                   name="parcelWeight"
//                   value={form.parcelWeight}
//                   onChange={handleChange}
//                   placeholder="Weight (kg)"
//                   className={`w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none ${
//                     weightOptionalTypes.includes(form.parcelType)
//                       ? "bg-gray-200 cursor-not-allowed"
//                       : ""
//                   }`}
//                   required={!weightOptionalTypes.includes(form.parcelType)}
//                   disabled={weightOptionalTypes.includes(form.parcelType)}
//                 />
//                 <select
//                   name="parcelType"
//                   value={form.parcelType}
//                   onChange={handleChange}
//                   className="w-full border bg-black px-4 py-3 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
//                   required
//                 >
//                   <option value="">Select Parcel Type</option>
//                   <option value="Documents">Documents</option>
//                   <option value="Electronics">Electronics</option>
//                   <option value="Clothes">Clothes</option>
//                   <option value="Fragile">Fragile Item</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Conditionally render additional notes */}

//                 <textarea
//                   name="note"
//                   value={form.note}
//                   onChange={handleChange}
//                   placeholder="Additional Notes (optional)"
//                   className="w-full border px-4 py-3 rounded-md min-h-[100px] focus:ring-2 focus:ring-amber-500 outline-none"
//                 />

//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-amber-500 hover:bg-amber-600 w-full text-white font-semibold rounded-lg px-6 py-3 transition duration-300"
//           >
//             Send Parcel
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

export default function SendParcelForm() {
  const {register, handleSubmit, watch, formState:{error}} = useForm()
  const [serviceCenters, setServiceCenters] = useState([]);

  useEffect(() => {
    fetch("/serviceCenter.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((error) => console.log(error));
  }, []);

  // Extract unique regions
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];
  // Get districts by region
  const getDistrictsByRegion = (region) =>
    serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  const parcelType = watch("type");
  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <form className="space-y-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Send a Parcel</h2>
          <p className="text-gray-500">Fill in the details below </p>
        </div>

        {/* Parcel Info */}
        <div className="border p-4 rounded-xl shadow-md space-y-4">
          <h3 className="font-semibold text-xl ">Parcel Info</h3>
          <div className="space-y-4">
             {/* Parcel Name */}
          <div>
             <label htmlFor="" className="label">Parcel Name</label>
             <input 
               {...register('title', {required:true})}
               className="input input-bordered w-full"
               placeholder="Describe your parcel"
             />
            {error.title && <p className="text-red-500 text-sm">Parcel name is required</p>}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="" className="label">Type</label>
            <div>
              <label className="flex items-center gap-2">
                 <input type="radio"
                 value='document'
                 {...register('type', {required: true})}
                 className="radio"
                  />
                  Document
              </label>
              <label className="flex items-center gap-2">
                 <input type="radio" 
                 value={'non-document'}
                 {...register('type', {required: true})}
                 className="radio"
                 />
                 Non-Document
              </label>
            </div>
            {error.type && <p className="text-red-500 text-sm">Type is required</p>}
          </div>

          {/* Weight */}
          <div>
            <label className="label">Weight (kg) </label>
            <input type="number" step='0.1' {...register('weight')} className={`input input-bordered w-full ${parcelType !== 'non-document' ? 'bg-gray-100 cursor-not-allowed' : ''}`} placeholder="Enter Weight" />
          </div>
          </div>

        </div>


       {/* Sender & Receiver Info */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sender Info */}
        <div className="border p-4 rounded-xl shadow-md space-y-4">
          <h3 className="font-semibold text-xl">Sender Info</h3>
          <div className="grid grid-cols-1 gap-4">
            <input {...register('sender_name', {required:true})}
            className="input input-borderded" />
          </div>
        </div>

        {/* Receiver Info */}
        <div></div>
       </div>

      </form>
    </div>
  );
}
