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
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();

  // Refresh session on component mount to get latest role
  useEffect(() => {
    if (update) update();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          You are not logged in!
        </p>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-blue-500 to-green-400 relative">
          <img
            src={user.image || "https://i.ibb.co/2n8qPkw/default-avatar.png"}
            alt={user.name}
            className="w-32 h-32 rounded-full shadow-lg border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-16"
          />
        </div>

        {/* Profile content */}
        <div className="pt-20 px-8 pb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <span className="mt-3 inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
              {user.role || "User"}
            </span>
          </div>

          {/* Info Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50">
              <User className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50">
              <Mail className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50">
              <Phone className="text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{user.phone || "Not added"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border bg-gray-50">
              <Shield className="text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{user.role || "User"}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition shadow-sm">
              <Settings className="text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Account Settings
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition shadow-sm">
              <Bell className="text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Notifications
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition shadow-sm">
              <Clock className="text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Activity Log
              </span>
            </button>
            <button className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition shadow-sm">
              <Calendar className="text-red-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                My Events
              </span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
