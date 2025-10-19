// 'use client'

// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const bdDivisions = {
//   Dhaka: ["Dhaka", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Faridpur", "Gopalganj", "Madaripur"],
//   Chattogram: ["Chattogram", "Cox’s Bazar", "Rangamati", "Bandarban", "Khagrachhari", "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Cumilla", "Chandpur"],
//   Khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
//   Rajshahi: ["Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj"],
//   Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
//   Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
//   Barishal: ["Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Barguna"],
//   Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
// };

// export default function BecomeRiderForm() {
//   const { data: session, status } = useSession();
//   const { register, handleSubmit, reset } = useForm();
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const [loading, setLoading] = useState(false);
//   const [selectedDivision, setSelectedDivision] = useState("");

//   const onSubmit = async (formData) => {
//     if (status !== "authenticated" || !session?.token) {
//       toast.error("⚠️ You must be logged in to apply!");
//       return;
//     }

//     if (session.user.role !== "user") {
//       toast.error("⚠️ Only users with 'user' role can apply!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${apiUrl}/riders`,
//         {
//           ...formData,
//           name: session.user.name,
//           email: session.user.email,
//           status: "pending",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${session.token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("✅ Application submitted! Status: Pending");
//         reset();
//         setSelectedDivision("");
//       } else {
//         toast.error(res.data.message || "❌ Failed to submit");
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response?.status === 403) {
//         toast.error("❌ Forbidden: You don't have permission to apply");
//       } else {
//         toast.error("⚠️ Server error, please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
//           Become a <span className="text-yellow-500">Rider</span>
//         </h2>
//         <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
//           Fill in the details below to apply as a rider. Our team will review your
//           application and get back to you soon.
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Name & Email */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Full Name</label>
//             <input type="text" value={session?.user?.name || ""} disabled className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"/>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Email</label>
//             <input type="email" value={session?.user?.email || ""} disabled className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"/>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Phone Number</label>
//             <input type="text" {...register("phone", { required: true })} placeholder="Enter your phone number" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"/>
//           </div>

//           {/* Division & District */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Division (Region)</label>
//             <select {...register("division", { required: true })} onChange={(e) => setSelectedDivision(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition">
//               <option value="">Select Division</option>
//               {Object.keys(bdDivisions).map((division) => (
//                 <option key={division} value={division}>{division}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">District</label>
//             <select {...register("district", { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition">
//               <option value="">Select District</option>
//               {selectedDivision && bdDivisions[selectedDivision].map((district) => (
//                 <option key={district} value={district}>{district}</option>
//               ))}
//             </select>
//           </div>

//           {/* Address, NID, Vehicle, Experience */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Address</label>
//             <input type="text" {...register("address", { required: true })} placeholder="Enter your address" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"/>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">NID / Driving License</label>
//             <input type="text" {...register("nid", { required: true })} placeholder="Enter NID / License number" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"/>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Vehicle Type</label>
//             <select {...register("vehicleType", { required: true })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition">
//               <option value="">Select Vehicle</option>
//               <option value="Bike">Bike</option>
//               <option value="Cycle">Cycle</option>
//               <option value="Car">Car</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Experience</label>
//             <input type="text" {...register("experience")} placeholder="e.g. 2 years" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"/>
//           </div>

//           <button type="submit" disabled={loading} className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl shadow-md transition">
//             {loading ? "Submitting..." : "Submit Application"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }





















// 'use client'

// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const bdDivisions = {
//   Dhaka: ["Dhaka", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Faridpur", "Gopalganj", "Madaripur"],
//   Chattogram: ["Chattogram", "Cox's Bazar", "Rangamati", "Bandarban", "Khagrachhari", "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Cumilla", "Chandpur"],
//   Khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
//   Rajshahi: ["Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj"],
//   Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
//   Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
//   Barishal: ["Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Barguna"],
//   Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
// };

// export default function BecomeRiderForm() {
//   const { data: session, status } = useSession();
//   const { register, handleSubmit, reset } = useForm();
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const [loading, setLoading] = useState(false);
//   const [selectedDivision, setSelectedDivision] = useState("");

//   const onSubmit = async (formData) => {
//     if (status !== "authenticated") {
//       toast.error("⚠️ You must be logged in to apply!");
//       return;
//     }

//     if (session.user.role !== "user") {
//       toast.error("⚠️ Only users with 'user' role can apply!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${apiUrl}/riders`,
//         {
//           ...formData,
//           name: session.user.name,
//           email: session.user.email,
//           status: "pending",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             // ✅ REMOVED: Authorization header (JWT removed)
//             "user-id": session.user.id, // ✅ ADDED: User ID for authentication
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success("✅ Application submitted! Status: Pending");
//         reset();
//         setSelectedDivision("");
//       } else {
//         toast.error(res.data.message || "❌ Failed to submit");
//       }
//     } catch (error) {
//       console.error("Application error:", error);
      
//       if (error.response?.status === 403) {
//         toast.error("❌ Forbidden: You don't have permission to apply");
//       } else if (error.response?.status === 401) {
//         toast.error("❌ Authentication required. Please login again.");
//       } else {
//         toast.error("⚠️ Server error, please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show loading while checking session
//   if (status === "loading") {
//     return (
//       <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//         <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
//           <p className="text-gray-600 dark:text-gray-300">Loading...</p>
//         </div>
//       </section>
//     );
//   }

//   // Show message if not authenticated
//   if (status !== "authenticated") {
//     return (
//       <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//         <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
//           <p className="text-red-500 dark:text-red-400 text-lg">
//             Please login to apply as a rider.
//           </p>
//         </div>
//       </section>
//     );
//   }

//   // Show message if user role is not 'user'
//   if (session.user.role !== "user") {
//     return (
//       <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//         <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
//           <p className="text-red-500 dark:text-red-400 text-lg">
//             Only regular users can apply to become riders.
//           </p>
//           <p className="text-gray-600 dark:text-gray-300 mt-2">
//             Your current role: {session.user.role}
//           </p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
//           Become a <span className="text-yellow-500">Rider</span>
//         </h2>
//         <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
//           Fill in the details below to apply as a rider. Our team will review your
//           application and get back to you soon.
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Name & Email */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Full Name</label>
//             <input 
//               type="text" 
//               value={session?.user?.name || ""} 
//               disabled 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Email</label>
//             <input 
//               type="email" 
//               value={session?.user?.email || ""} 
//               disabled 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Phone Number</label>
//             <input 
//               type="text" 
//               {...register("phone", { required: true })} 
//               placeholder="Enter your phone number" 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             />
//           </div>

//           {/* Division & District */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Division (Region)</label>
//             <select 
//               {...register("division", { required: true })} 
//               onChange={(e) => setSelectedDivision(e.target.value)} 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             >
//               <option value="">Select Division</option>
//               {Object.keys(bdDivisions).map((division) => (
//                 <option key={division} value={division}>{division}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">District</label>
//             <select 
//               {...register("district", { required: true })} 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             >
//               <option value="">Select District</option>
//               {selectedDivision && bdDivisions[selectedDivision].map((district) => (
//                 <option key={district} value={district}>{district}</option>
//               ))}
//             </select>
//           </div>

//           {/* Address, NID, Vehicle, Experience */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Address</label>
//             <input 
//               type="text" 
//               {...register("address", { required: true })} 
//               placeholder="Enter your address" 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">NID / Driving License</label>
//             <input 
//               type="text" 
//               {...register("nid", { required: true })} 
//               placeholder="Enter NID / License number" 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Vehicle Type</label>
//             <select 
//               {...register("vehicleType", { required: true })} 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             >
//               <option value="">Select Vehicle</option>
//               <option value="Bike">Bike</option>
//               <option value="Cycle">Cycle</option>
//               <option value="Car">Car</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Experience</label>
//             <input 
//               type="text" 
//               {...register("experience")} 
//               placeholder="e.g. 2 years" 
//               className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
//             />
//           </div>

//           <button 
//             type="submit" 
//             disabled={loading} 
//             className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-gray-900 font-semibold rounded-xl shadow-md transition"
//           >
//             {loading ? "Submitting..." : "Submit Application"}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }





















'use client'

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const bdDivisions = {
  Dhaka: ["Dhaka", "Gazipur", "Kishoreganj", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Faridpur", "Gopalganj", "Madaripur"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Rangamati", "Bandarban", "Khagrachhari", "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Cumilla", "Chandpur"],
  Khulna: ["Khulna", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Rajshahi: ["Rajshahi", "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Barishal: ["Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Barguna"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

export default function BecomeRiderForm() {
  const { data: session, status } = useSession();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [loading, setLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");

  const onSubmit = async (formData) => {
    if (status !== "authenticated") {
      toast.error("⚠️ You must be logged in to apply!");
      return;
    }

    if (session.user.role !== "user") {
      toast.error("⚠️ Only users with 'user' role can apply!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${apiUrl}/riders`,
        {
          ...formData,
          name: session.user.name,
          email: session.user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Application submitted successfully! We will review your application soon.");
        reset();
        setSelectedDivision("");
      } else {
        toast.error(res.data.error || "❌ Failed to submit application");
      }
    } catch (error) {
      console.error("Application error:", error);
      
      if (error.response?.data?.error) {
        toast.error(`❌ ${error.response.data.error}`);
      } else if (error.response?.status === 400) {
        toast.error("❌ Please fill all required fields correctly");
      } else if (error.response?.status === 409) {
        toast.error("❌ You have already submitted an application");
      } else {
        toast.error("⚠️ Server error, please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (status === "loading") {
    return (
      <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4">Loading...</p>
        </div>
      </section>
    );
  }

  // Show message if not authenticated
  if (status !== "authenticated") {
    return (
      <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
          <p className="text-red-500 dark:text-red-400 text-lg">
            Please login to apply as a rider.
          </p>
        </div>
      </section>
    );
  }

  // Show message if user role is not 'user'
  if (session.user.role !== "user") {
    return (
      <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
          <p className="text-red-500 dark:text-red-400 text-lg">
            Only regular users can apply to become riders.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your current role: {session.user.role}
          </p>
        </div>
      </section>
    );
  }

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
          {/* Name & Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Full Name *
            </label>
            <input 
              type="text" 
              value={session?.user?.name || ""} 
              disabled 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Email *
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
              Phone Number *
            </label>
            <input 
              type="tel" 
              {...register("phone", { 
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+88|01)?\d{11}$/,
                  message: "Enter a valid Bangladeshi phone number"
                }
              })} 
              placeholder="Enter your phone number" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Division & District */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Division (Region) *
            </label>
            <select 
              {...register("division", { required: "Division is required" })} 
              onChange={(e) => setSelectedDivision(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            >
              <option value="">Select Division</option>
              {Object.keys(bdDivisions).map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-500 text-sm mt-1">{errors.division.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              District *
            </label>
            <select 
              {...register("district", { required: "District is required" })} 
              disabled={!selectedDivision}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition disabled:opacity-50"
            >
              <option value="">{selectedDivision ? "Select District" : "First select division"}</option>
              {selectedDivision && bdDivisions[selectedDivision].map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
            )}
          </div>

          {/* Address, NID, Vehicle, Experience */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Full Address *
            </label>
            <input 
              type="text" 
              {...register("address", { required: "Address is required" })} 
              placeholder="Enter your complete address" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              NID / Driving License Number *
            </label>
            <input 
              type="text" 
              {...register("nid", { required: "NID/License is required" })} 
              placeholder="Enter NID or Driving License number" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.nid && (
              <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Vehicle Type *
            </label>
            <select 
              {...register("vehicleType", { required: "Vehicle type is required" })} 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            >
              <option value="">Select Vehicle</option>
              <option value="Bike">Bike</option>
              <option value="Cycle">Cycle</option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
              Delivery Experience
            </label>
            <input 
              type="text" 
              {...register("experience")} 
              placeholder="e.g. 2 years in food delivery, 1 year in parcel delivery" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-gray-900 font-semibold rounded-xl shadow-md transition transform hover:scale-105 disabled:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}