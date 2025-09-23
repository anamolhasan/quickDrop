"use client";
import Link from "next/link";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";

const page = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to upload image to ImgBB
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error.message || 'Image upload failed');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    
    try {
      let photoUrl = null;

      // Upload image to ImgBB if file exists
      if (data.photo && data.photo[0]) {
        setMessage("📤 Uploading image...");
        try {
          photoUrl = await uploadImageToImgBB(data.photo[0]);
          console.log('Image uploaded successfully:', photoUrl);
        } catch (error) {
          console.error('Image upload error:', error);
          setMessage("❌ Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      // Send user data with image URL to backend
      setMessage("👤 Creating account...");
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        photo: photoUrl
      };

      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      
      if (res.ok) {
        setMessage("✅ Registration successful! You can login now.");
        console.log("User registered:", result);
        // Optional: Reset form
        reset();
      } else {
        setMessage(result.error || "❌ Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
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

      <form
        className="md:w-[530px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className="text-[16px] space-y-5">
          {/* Name Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-amber-500">
            <IoPersonAddOutline size={27} className="text-gray-500 mr-2" />
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
              disabled={loading}
            />
          </div>
          {errors.name?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Name is required</p>
          )}

          {/* Image Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-amber-500">
            <CiImageOn size={27} className="mr-2" />
            <input
              type="file"
              {...register("photo")}
              accept="image/*"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
              disabled={loading}
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-amber-500">
            <MdOutlineMail size={27} className="text-gray-500 mr-2" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email here"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
              disabled={loading}
            />
          </div>
          {errors.email?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Email is required</p>
          )}

          {/* Password Field */}
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md px-3 focus-within:border-amber-500">
            <MdLockOutline size={27} className="text-gray-500 mr-2" />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="w-full py-3 bg-gray-100 placeholder:text-center focus:outline-none"
              disabled={loading}
            />
          </div>
          {errors.password?.type === "required" && (
            <p className="text-red-600 ml-2 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600 ml-2 text-sm">
              Password must be 6 characters or longer
            </p>
          )}

          {/* Message Display */}
          {message && (
            <div className={`text-center p-2 rounded ${
              message.includes('✅') ? 'bg-green-100 text-green-700' :
              message.includes('❌') ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white text-[18px] font-semibold transition-colors duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </fieldset>

        <div className="mt-6 text-center space-y-3">
          <button
            type="button"
            onClick={() => signIn("google")}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full md:w-1/2 mx-auto bg-white text-gray-700 border border-gray-300 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition duration-200 disabled:opacity-50"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => signIn("github")}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full md:w-1/2 mx-auto bg-gray-900 text-white rounded-xl px-4 py-2 shadow-sm hover:bg-gray-800 transition duration-200 disabled:opacity-50"
          >
            <FaGithub className="text-xl" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Login Link */}
        <p className="text-[18px] text-center mt-6">
          Already have an account?
          <Link href="/login" className="text-amber-500 ml-2 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default page;