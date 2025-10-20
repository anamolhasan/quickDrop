"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BarChart3, TrendingUp, Users, Package, Clock } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PODAnalyticsPage() {
  const { data: session, status } = useSession();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/admin/pod-analytics`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading analytics...</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Proofs",
      value: analytics?.totalProofs || 0,
      icon: <Package className="text-blue-600" size={24} />,
      bg: "bg-blue-500"
    },
    {
      title: "Signature Proofs",
      value: analytics?.proofTypes?.signature || 0,
      icon: <TrendingUp className="text-yellow-600" size={24} />,
      bg: "bg-yellow-500"
    },
    {
      title: "OTP Proofs", 
      value: analytics?.proofTypes?.otp || 0,
      icon: <Users className="text-green-600" size={24} />,
      bg: "bg-green-500"
    },
    {
      title: "Photo Proofs",
      value: analytics?.proofTypes?.photo || 0,
      icon: <Clock className="text-purple-600" size={24} />,
      bg: "bg-purple-500"
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <BarChart3 size={32} className="text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">POD Analytics</h1>
          <button 
            onClick={fetchAnalytics}
            className="ml-auto px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Proof Type Distribution */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Proof Type Distribution</h3>
            <div className="space-y-3">
              {['signature', 'otp', 'photo'].map((type) => (
                <div key={type} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{type}</span>
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        type === 'signature' ? 'bg-yellow-500' :
                        type === 'otp' ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ 
                        width: `${(analytics?.proofTypes?.[type] / analytics?.totalProofs) * 100 || 0}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {analytics?.proofTypes?.[type] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent POD Activity</h3>
            <div className="space-y-3">
              {analytics?.recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'signature' ? 'bg-yellow-500' :
                    activity.type === 'otp' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.trackingId}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.riderName} • {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
                    activity.type === 'signature' ? 'bg-yellow-500' :
                    activity.type === 'otp' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}