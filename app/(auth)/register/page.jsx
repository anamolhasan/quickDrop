

"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineMail, MdLockOutline } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {

  // local host api url
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const uploadImageToImgBB = async (file) => {
  if (!file) return null; // Guard against empty file

  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const base64 = reader.result.split(",")[1]; // Remove prefix
        if (!base64) throw new Error("Empty image");

        const formData = new FormData();
        formData.append("image", base64);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          { method: "POST", body: formData }
        );

        const data = await res.json();

        if (data.success) resolve(data.data.url);
        else reject(data.error?.message || "Image upload failed");
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
  });
};


  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      let photoUrl = data.photo?.[0] ? await uploadImageToImgBB(data.photo[0]) : null;

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        photo: photoUrl,
        role: "user",
      };

      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! You can login now.");
        reset();
      } else {
        setMessage(result.error || "❌ Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-4 md:mx-0 justify-center text-gray-800">
      <div className="flex flex-col items-center">
        <p>Logo</p>
        <h1 className="text-2xl font-semibold mt-4 mb-7">Create an Account</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[530px] mx-auto" noValidate>
        <fieldset className="space-y-5">
          {/* Name */}
          <div className="flex items-center border rounded-md px-3 bg-gray-100">
            <IoPersonAddOutline size={27} className="text-gray-500 mr-2" />
            <input type="text" {...register("name", { required: true })} placeholder="Enter name" className="w-full py-3 bg-gray-100 focus:outline-none" disabled={loading} />
          </div>
          {errors.name && <p className="text-red-600 text-sm">Name is required</p>}

          {/* Photo */}
          <div className="flex items-center border rounded-md px-3 bg-gray-100">
            <CiImageOn size={27} className="mr-2" />
            <input type="file" {...register("photo")} accept="image/*" className="w-full py-3 focus:outline-none" disabled={loading} />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-md px-3 bg-gray-100">
            <MdOutlineMail size={27} className="text-gray-500 mr-2" />
            <input type="email" {...register("email", { required: true })} placeholder="Enter email" className="w-full py-3 bg-gray-100 focus:outline-none" disabled={loading} />
          </div>
          {errors.email && <p className="text-red-600 text-sm">Email is required</p>}

          {/* Password */}
          <div className="flex items-center border rounded-md px-3 bg-gray-100">
            <MdLockOutline size={27} className="text-gray-500 mr-2" />
            <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder="Password" className="w-full py-3 bg-gray-100 focus:outline-none" disabled={loading} />
          </div>
          {errors.password && <p className="text-red-600 text-sm">Password must be at least 6 characters</p>}

          {message && <div className="text-center p-2 rounded bg-blue-100 text-blue-700">{message}</div>}

          <button type="submit" disabled={loading} className={`w-full py-3 rounded-md text-white font-semibold ${loading ? "bg-gray-400" : "bg-amber-500 hover:bg-amber-600"}`}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </fieldset>

        <p className="text-center mt-6">
          Already have an account? <Link href="/login" className="text-amber-500 underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}
