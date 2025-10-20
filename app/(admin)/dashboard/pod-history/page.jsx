"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { History, Search, Download, Calendar } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PODHistoryPage() {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetchPODHistory();
    }
  }, [status]);

  const fetchPODHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/rider/${session?.user?.id}/pod-history`);
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch POD history");
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(item =>
    item.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
    item.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading POD history...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <History size={32} className="text-purple-600 dark:text-purple-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">POD History</h1>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tracking ID or customer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No POD history found. 📭
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredHistory.map((item) => (
              <div key={item._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.customerName}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">📦 {item.trackingId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                    item.proofType === 'signature' ? 'bg-yellow-500' :
                    item.proofType === 'otp' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {item.proofType}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p>📍 {item.address}</p>
                  <p>📅 {new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                    <Download size={14} /> Download Proof
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}