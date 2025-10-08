"use client";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bike, Sparkles, Zap, Shield } from "lucide-react"; // Reusing icons for the side panel

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      toast.error("❌ Please enter both email and password.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      toast.success("✅ Login successful!");
      router.push("/");
    } else {
      toast.error(res?.error || "❌ Invalid email or password");
    }
  };

  const handleSocialLogin = (provider) => {
    signIn(provider);
  };

  const marketingPoints = [
    { icon: Sparkles, text: "Instant Fleet Deployment" },
    { icon: Zap, text: "Real-time Order Tracking" },
    { icon: Shield, text: "Enterprise-grade Security" },
  ];

  return (
    // Main container: min-h-screen (for centering), themed background
    <div className="flex justify-center items-center min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-950">
      
      {/* Wide Two-Column Card (Themed) */}
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl flex border border-gray-200 dark:border-gray-800">
        
        {/* 1. Left Column (Login Form) - White/Dark Gray Background */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white dark:bg-gray-900">
          
          {/* Header */}
          <div className="flex flex-col items-center sm:items-start mb-8">
            <Bike size={40} className="text-orange-600 dark:text-orange-400 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Access your Delivery Admin Dashboard.</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="admin@example.com"
                  className="w-full pl-11 pr-4 py-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">Email is required</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="Password"
                  className="w-full pl-11 pr-4 py-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">Password is required (min 6 characters)</p>}
            </div>

            {/* Login Button (Themed Gradient) */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-yellow-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
            >
              Secure Login
            </button>

            {/* Register Link */}
            <p className="text-center pt-2 text-gray-700 dark:text-gray-300 text-sm">
              Don’t have an account?
              <Link href="/register" className="text-orange-500 dark:text-yellow-400 font-semibold hover:underline ml-2">
                Register Here
              </Link>
            </p>

            {/* Social Login Section (Minimal height version) */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-center text-gray-500 dark:text-gray-400 mb-3 text-sm">or sign in with</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-xl px-4 py-3 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FcGoogle className="text-xl" />
                </button>
                
                <button
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  className="flex items-center justify-center flex-1 bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl px-4 py-3 font-medium shadow-sm hover:bg-gray-800 transition-colors"
                >
                  <FaGithub className="text-xl" />
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* 2. Right Column (Marketing/Illustration) - Hidden on small screens, themed accent background */}
        <div className="hidden lg:flex w-1/2 justify-center items-center p-12 relative bg-gray-100 dark:bg-gray-800">
          
          {/* Accent Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-transparent opacity-70 dark:opacity-30"></div>

          <div className="relative text-gray-900 dark:text-white">
            <h2 className="text-3xl font-extrabold leading-tight">
              Manage Your Fleet, <span className="text-orange-600 dark:text-orange-400">Simplified.</span>
            </h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Your one-stop dashboard for all logistics and rider operations.
            </p>
            
            <ul className="mt-6 space-y-3">
              {marketingPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <point.icon size={20} className="mt-1 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <span className="text-md font-medium dark:text-gray-300">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}