"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Shield, Search, Download, Eye, XCircle, Calendar } from "lucide-react";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DeliveryProofsPage() {
  const { data: session, status } = useSession();
  const [proofs, setProofs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProof, setSelectedProof] = useState(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetchDeliveryProofs();
    }
  }, [status]);

  const fetchDeliveryProofs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/admin/delivery-proofs`, {
        headers: { "user-id": session?.user?.id },
      });

      if (!res.ok) throw new Error("Failed to fetch proofs");
      
      const data = await res.json();
      setProofs(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load delivery proofs.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProofs = proofs.filter(proof =>
    proof.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
    proof.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    proof.riderName?.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading delivery proofs...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <Shield size={32} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Delivery Proofs</h1>
          <button 
            onClick={fetchDeliveryProofs}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by tracking ID, customer, or rider..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {filteredProofs.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No delivery proofs found. 📝
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr className="uppercase text-left text-xs font-semibold tracking-wider">
                  <th className="p-4 text-gray-700 dark:text-gray-300">Tracking ID</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Customer</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Rider</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Proof Type</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Date</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredProofs.map((proof, idx) => (
                  <tr key={proof._id} className={`transition-all ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"} hover:bg-blue-50/70 dark:hover:bg-gray-800/70`}>
                    <td className="p-4 text-gray-900 dark:text-white font-medium">{proof.trackingId}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{proof.customerName}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{proof.riderName}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-full text-white font-semibold text-xs capitalize shadow-md ${
                        proof.proofType === 'signature' ? 'bg-yellow-500 shadow-yellow-500/30' :
                        proof.proofType === 'otp' ? 'bg-blue-500 shadow-blue-500/30' :
                        'bg-green-500 shadow-green-500/30'
                      }`}>
                        {proof.proofType}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {new Date(proof.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedProof(proof)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          <Eye size={14} /> View
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                          <Download size={14} /> Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Proof Details Modal */}
        {selectedProof && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-200 dark:border-gray-800 relative">
              <button onClick={() => setSelectedProof(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                <XCircle size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-3">
                Proof Details - {selectedProof.trackingId}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Delivery Info</h3>
                  <p><span className="font-medium">Customer:</span> {selectedProof.customerName}</p>
                  <p><span className="font-medium">Rider:</span> {selectedProof.riderName}</p>
                  <p><span className="font-medium">Proof Type:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs text-white ${
                      selectedProof.proofType === 'signature' ? 'bg-yellow-500' :
                      selectedProof.proofType === 'otp' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {selectedProof.proofType}
                    </span>
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Timeline</h3>
                  <p><span className="font-medium">Delivered At:</span> {new Date(selectedProof.timestamp).toLocaleString()}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className="ml-2 px-2 py-1 rounded-full bg-green-500 text-white text-xs">Verified</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Proof Data</h3>
                <div className="h-40 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  {selectedProof.proofType === 'signature' && <span>📝 Signature Preview</span>}
                  {selectedProof.proofType === 'otp' && <span>🔢 OTP: {selectedProof.proofData}</span>}
                  {selectedProof.proofType === 'photo' && <span>📸 Photo Preview</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}