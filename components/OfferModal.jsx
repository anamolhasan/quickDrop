'use client';
import { useState, useEffect } from 'react';
import { FaTimes, FaTag } from 'react-icons/fa';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function OfferModal() {
  const [showModal, setShowModal] = useState(false);
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkActiveOffer();
  }, []);

  const checkActiveOffer = async () => {
    try {
      // Check if user has already closed the modal in this session
      const hasClosedModal = sessionStorage.getItem('offerModalClosed');
      if (hasClosedModal) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${apiUrl}/api/offers/active`);
      const data = await response.json();
      
      if (data.success && data.offer) {
        // Check if offer has expired
        if (data.offer.expiresAt && new Date(data.offer.expiresAt) < new Date()) {
          return;
        }
        
        setOffer(data.offer);
        
        // Show modal after 3 seconds
        setTimeout(() => {
          setShowModal(true);
        }, 3000);
      }
    } catch (error) {
      console.error('Error fetching active offer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    // Remember that user closed the modal for this session
    sessionStorage.setItem('offerModalClosed', 'true');
  };

  const handleButtonClick = () => {
    if (offer.buttonLink && offer.buttonLink !== '#') {
      window.open(offer.buttonLink, '_blank');
    }
    handleClose();
  };

  if (loading || !showModal || !offer) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Offer Content */}
        <div className="relative">
          {/* Offer Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg">
              <FaTag className="text-sm" />
              <span className="text-sm font-semibold">Special Offer</span>
            </div>
          </div>

          {/* Image */}
          {offer.image && (
            <div className="w-full h-48 overflow-hidden rounded-t-2xl">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className={`p-6 ${offer.image ? '' : 'pt-10'}`}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
              {offer.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
              {offer.description}
            </p>

            {/* Expiry Date */}
            {offer.expiresAt && (
              <div className="text-center mb-4">
                <span className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs px-3 py-1 rounded-full">
                  ⏰ Offer ends: {new Date(offer.expiresAt).toLocaleDateString()}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleButtonClick}
                className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {offer.buttonText}
              </button>
              
              <button
                onClick={handleClose}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}