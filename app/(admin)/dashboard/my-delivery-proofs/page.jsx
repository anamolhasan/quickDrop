"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Package, Search, Download, Calendar } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function MyDeliveryProofsPage() {
  const { data: session, status } = useSession();
  const [myProofs, setMyProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetchMyProofs();
    }
  }, [status]);

  const fetchMyProofs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/user/${session?.user?.id}/delivery-proofs`);
      const data = await res.json();
      setMyProofs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch delivery proofs");
    } finally {
      setLoading(false);
    }
  };

  const filteredProofs = myProofs.filter(proof =>
    proof.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
    proof.riderName?.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading your delivery proofs...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <Package size={32} className="text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Delivery Proofs</h1>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tracking ID or rider name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {filteredProofs.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No delivery proofs found. 📦
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProofs.map((proof) => (
              <div key={proof._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Delivery #{proof.trackingId}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Delivered by: {proof.riderName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                    proof.proofType === 'signature' ? 'bg-yellow-500' :
                    proof.proofType === 'otp' ? 'bg-blue-500' : 'bg-green-500'
                  }`}>
                    {proof.proofType}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(proof.timestamp).toLocaleDateString()}
                  </div>
                  <div>
                    Status: <span className="text-green-600 font-semibold">Delivered</span>
                  </div>
                </div>
                
                <button className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  <Download size={16} /> Download Proof
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}