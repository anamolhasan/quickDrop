"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  Bike,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// --- Fake Data ---
const fakeDashboardData = {
  totalUsers: 2875,
  activeDeliveries: 620,
  availableRiders: 135,
  monthlyRevenue: 238000,
  riderDistribution: [
    { name: "Online", value: 65 },
    { name: "Offline", value: 35 },
  ],
  deliveryMetrics: [
    { month: "Jan", completed: 1600 },
    { month: "Feb", completed: 2000 },
    { month: "Mar", completed: 2400 },
    { month: "Apr", completed: 3100 },
    { month: "May", completed: 2800 },
    { month: "Jun", completed: 3500 },
    { month: "Jul", completed: 4100 },
    { month: "Aug", completed: 3800 },
    { month: "Sep", completed: 4200 },
    { month: "Oct", completed: 4700 },
  ],
};

const COLORS = ["#facc15", "#9ca3af"]; // yellow, gray

export default function AdminOverviewSection() {
  const { data: session, status } = useSession();
  const [data] = useState(fakeDashboardData);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[500px] bg-gray-50 dark:bg-gray-950 p-8">
        <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  // --- Metric Card ---
  const MetricCard = ({ title, value, icon: Icon, colorClass, isCurrency = false }) => (
    <motion.div
      className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 flex items-center justify-between transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p className={`text-3xl font-bold mt-1 ${colorClass}`}>
          {isCurrency ? `$${value.toLocaleString()}` : value.toLocaleString()}
        </p>
      </div>
      <div className={`p-3 rounded-full ${colorClass.replace("text", "bg")}/10`}>
        <Icon size={24} className={colorClass} />
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <TrendingUp size={32} className="text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard Overview
          </h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard
            title="Total Users"
            value={data.totalUsers}
            icon={Users}
            colorClass="text-yellow-600"
          />
          <MetricCard
            title="Monthly Revenue"
            value={data.monthlyRevenue}
            icon={DollarSign}
            colorClass="text-green-600"
            isCurrency={true}
          />
          <MetricCard
            title="Active Deliveries"
            value={data.activeDeliveries}
            icon={Package}
            colorClass="text-indigo-600"
          />
          <MetricCard
            title="Available Riders"
            value={data.availableRiders}
            icon={Bike}
            colorClass="text-red-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <motion.div
            className="lg:col-span-1 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Rider Status Distribution
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.riderDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {data.riderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            className="lg:col-span-2 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Monthly Completed Deliveries
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.deliveryMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#f59e0b" name="Completed Deliveries" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
