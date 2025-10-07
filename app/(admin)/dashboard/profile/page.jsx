"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LogOut,
  Mail,
  User,
  Phone,
  Shield,
  Settings,
  Clock,
  Calendar,
  Bell,
  MapPin, 
  Zap, 
} from "lucide-react";

export default function ProfilePage() {
  // Fix for auto-refreshing: set polling to 0 to disable background session checks
  const { data: session, status } = useSession({
    polling: 0, 
  });

  // Removed the unnecessary useEffect with update() which caused forced refreshes.

  // --- Render Statuses (Themed) ---
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <p className="text-xl font-semibold text-red-500">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const { user } = session;

  // Mocked/enhanced user data for a richer profile view
  const userProfile = {
    name: user.name || "User Name",
    email: user.email || "user@example.com",
    role: user.role || "User",
    image: user.photo || user.image || "https://i.ibb.co/2n8qPkw/default-avatar.png",
    phone: user.phone || "Not added",
    division: user.division || "Dhaka", 
    district: user.district || "Gazipur", 
    lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Recently",
  };

  // --- Main Render (Themed) ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Banner (Themed Gradient) */}
        <div className="h-32 bg-gradient-to-r from-orange-600 to-yellow-500 relative">
          <img
            src={userProfile.image}
            alt={userProfile.name}
            className="w-32 h-32 object-cover rounded-full shadow-xl border-4 border-white dark:border-gray-900 absolute left-1/2 transform -translate-x-1/2 -bottom-16"
          />
        </div>

        {/* Profile content */}
        <div className="pt-20 px-6 pb-8 md:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {userProfile.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {userProfile.email}
            </p>
            {/* Role Tag (Themed Yellow/Orange) */}
            <span className="mt-3 inline-block px-4 py-1.5 text-sm font-semibold bg-yellow-500/10 text-yellow-600 dark:bg-yellow-800/20 dark:text-yellow-400 rounded-full shadow-sm">
              <Shield size={14} className="inline-block mr-2" />
              {userProfile.role}
            </span>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-800" />

          {/* ## Account Information */}
          <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <User className="text-orange-500" size={20} /> Account Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
              <User className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userProfile.name}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
              <Mail className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userProfile.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
              <Phone className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userProfile.phone}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
              <Shield className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userProfile.role}
                </p>
              </div>
            </div>

            {/* Division */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
              <MapPin className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Division
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userProfile.division || "N/A"}
                </p>
              </div>
            </div>

            {/* District */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition hover:shadow-md">
              <MapPin className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  District
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userProfile.district || "N/A"}
                </p>
              </div>
            </div>
          </div>

          ---

          {/* ## Quick Actions */}
          <h3 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Zap className="text-orange-500" size={20} /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <button className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/40 hover:bg-yellow-100 dark:hover:bg-yellow-800/60 rounded-xl transition shadow-sm border border-yellow-100 dark:border-yellow-900/20">
              <Settings className="text-yellow-600 dark:text-yellow-400 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                Settings
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-800/60 rounded-xl transition shadow-sm border border-green-100 dark:border-green-900/20">
              <Bell className="text-green-600 dark:text-green-400 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                Notifications
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-800/60 rounded-xl transition shadow-sm border border-indigo-100 dark:border-indigo-900/20">
              <Clock className="text-indigo-600 dark:text-indigo-400 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                Activity Log
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/40 hover:bg-purple-100 dark:hover:bg-purple-800/60 rounded-xl transition shadow-sm border border-purple-100 dark:border-purple-900/20">
              <Calendar className="text-purple-600 dark:text-purple-400 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                My Events
              </span>
            </button>
          </div>

          ---

          {/* Logout Button (Themed) */}
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}