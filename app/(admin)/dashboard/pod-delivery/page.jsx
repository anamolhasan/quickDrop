"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Package, Search, XCircle, MapPin, Camera, Signature, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PODDeliveryPage() {
  const { data: session, status } = useSession();
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [proofType, setProofType] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPendingDeliveries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/deliveries/pending`, {
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.user?.id,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch deliveries");
      
      const data = await res.json();
      setPendingDeliveries(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load pending deliveries.");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") fetchPendingDeliveries();
  }, [status, fetchPendingDeliveries]);

  const handleProofSubmit = async (proofData) => {
    try {
      const res = await fetch(`${apiUrl}/delivery/${selectedDelivery._id}/proof`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proofType,
          proofData,
          riderId: session?.user?.id
        }),
      });

      if (res.ok) {
        toast.success("Delivery proof submitted successfully!");
        setSelectedDelivery(null);
        setProofType(null);
        fetchPendingDeliveries();
      }
    } catch (err) {
      toast.error("Failed to submit proof.");
    }
  };

  const filteredDeliveries = pendingDeliveries.filter(delivery =>
    delivery.trackingId?.toLowerCase().includes(search.toLowerCase()) ||
    delivery.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading deliveries...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <Package size={32} className="text-green-600 dark:text-green-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">POD Delivery</h1>
          <button 
            onClick={fetchPendingDeliveries}
            className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by tracking ID or customer name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-green-500 focus:border-green-500 transition-colors"
          />
        </div>

        {filteredDeliveries.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No pending deliveries found. 🎉
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery._id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{delivery.customerName}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">📦 {delivery.trackingId}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center gap-1">
                  <MapPin size={14} /> {delivery.address}
                </p>
                <button
                  onClick={() => setSelectedDelivery(delivery)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Collect Proof
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Proof Collection Modal */}
        {selectedDelivery && !proofType && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800">
              <button onClick={() => setSelectedDelivery(null)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500">
                <XCircle size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">Collect Proof</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Choose proof type for {selectedDelivery.customerName}</p>
              
              <div className="grid gap-3">
                <button onClick={() => setProofType('signature')} className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-yellow-500 transition-colors">
                  <Signature className="text-yellow-600" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white">Digital Signature</span>
                </button>
                
                <button onClick={() => setProofType('otp')} className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 transition-colors">
                  <Smartphone className="text-blue-600" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white">OTP Verification</span>
                </button>
                
                <button onClick={() => setProofType('photo')} className="flex items-center gap-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-500 transition-colors">
                  <Camera className="text-green-600" size={24} />
                  <span className="font-semibold text-gray-900 dark:text-white">Photo Proof</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Proof Type Modals */}
        {selectedDelivery && proofType === 'signature' && (
          <SignaturePad 
            delivery={selectedDelivery}
            onSubmit={handleProofSubmit}
            onClose={() => setProofType(null)}
          />
        )}
        
        {selectedDelivery && proofType === 'otp' && (
          <OTPVerification 
            delivery={selectedDelivery}
            onSubmit={handleProofSubmit}
            onClose={() => setProofType(null)}
          />
        )}
        
        {selectedDelivery && proofType === 'photo' && (
          <PhotoUpload 
            delivery={selectedDelivery}
            onSubmit={handleProofSubmit}
            onClose={() => setProofType(null)}
          />
        )}
      </div>
    </div>
  );
}

// Signature Component
const SignaturePad = ({ delivery, onSubmit, onClose }) => {
  const [signature, setSignature] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <XCircle size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Digital Signature</h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 h-40 mb-4 rounded-lg bg-gray-50 dark:bg-gray-800"></div>
        <button 
          onClick={() => onSubmit(signature)}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
};

// OTP Component  
const OTPVerification = ({ delivery, onSubmit, onClose }) => {
  const [otp, setOtp] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <XCircle size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">OTP Verification</h3>
        <input 
          type="text" 
          placeholder="Enter OTP sent to customer"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button 
          onClick={() => onSubmit(otp)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

// Photo Component
const PhotoUpload = ({ delivery, onSubmit, onClose }) => {
  const [photo, setPhoto] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <XCircle size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Photo Proof</h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 h-40 mb-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <Camera size={48} className="text-gray-400" />
        </div>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full mb-4"
        />
        <button 
          onClick={() => onSubmit(photo)}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Upload Photo
        </button>
      </div>
    </div>
  );
};