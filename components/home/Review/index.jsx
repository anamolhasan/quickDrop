"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeedbackSlider() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch feedback from your backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:5000/feedback");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  // Function to truncate long feedback
  const truncateFeedback = (text, maxLength = 150) => {
    if (!text) return "No feedback provided";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Client <span className="text-yellow-500">Testimonials</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover what our valued clients and partners have to say about their experience working with us.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {/* Swiper Section */}
        {!isLoading && (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={32}
              slidesPerView={1}
              autoplay={{ 
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true 
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3 },
              }}
              className="feedback-swiper"
            >
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 h-80 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                      {/* Feedback Content */}
                      <div className="flex-1 overflow-hidden">
                        <div className="mb-4">
                          {/* Star Rating */}
                          <div className="flex items-center mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-5 h-5 ${
                                  star <= (fb.rating || 5)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          
                          {/* Feedback Text */}
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-5">
                            "{truncateFeedback(fb.message || fb.feedback)}"
                          </p>
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {fb.name ? fb.name[0].toUpperCase() : "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 dark:text-white font-semibold truncate">
                            {fb.name || "Anonymous User"}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {fb.position || fb.email || "Client"}
                          </p>
                          {fb.company && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                              {fb.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 h-80 flex items-center justify-center text-center">
                    <div>
                      <div className="text-gray-400 dark:text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                        No testimonials available yet
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                        Be the first to share your experience
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev !-left-4 lg:!-left-8 !text-yellow-500 !scale-75 lg:!scale-100"></div>
            <div className="swiper-button-next !-right-4 lg:!-right-8 !text-yellow-500 !scale-75 lg:!scale-100"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .feedback-swiper {
          padding: 20px 10px;
        }
        
        @media (min-width: 768px) {
          .feedback-swiper {
            padding: 20px 40px;
          }
        }
      `}</style>
    </section>
  );
}