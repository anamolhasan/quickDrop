'use client';
import { useState } from 'react';
import { Truck, Clock, Zap, Shield, Building2, MapPin, ArrowRight, Star } from 'lucide-react';

const index = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      icon: Truck,
      title: "Standard Delivery",
      description: "Affordable and reliable delivery within 24–48 hours. Perfect for everyday parcels and non-urgent shipments.",
      badge: "Most Popular",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      features: ["24-48 hour delivery", "Affordable pricing", "Package tracking"]
    },
    {
      icon: Clock,
      title: "Express Delivery",
      description: "Same-day delivery with optimized routes. Ideal for time-sensitive documents and urgent packages.",
      badge: "Same Day",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      features: ["Same-day delivery", "Optimized routes", "Priority handling"]
    },
    {
      icon: Zap,
      title: "Priority Delivery",
      description: "Ultra-fast delivery in just 2–4 hours. Best for critical packages like legal documents or medical items.",
      badge: "Fastest",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      features: ["2-4 hour delivery", "Critical priority", "Dedicated courier"]
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Track your package live with GPS updates and instant notifications from pickup to doorstep.",
      badge: "Live Updates",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      features: ["GPS tracking", "Live updates", "SMS notifications"]
    },
    {
      icon: Shield,
      title: "Secure & Insured",
      description: "All packages are covered up to $100. Extra insurance available for high-value items.",
      badge: "Protected",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100",
      features: ["$100 coverage", "Secure handling", "Extra insurance"]
    },
    {
      icon: Building2,
      title: "Business Solutions",
      description: "Bulk deliveries, API integration, dedicated support, and discounts tailored for businesses.",
      badge: "Enterprise",
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      features: ["Bulk pricing", "API access", "Dedicated support"]
    }
  ];

  return (
    <section className="py-24  bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-yellow-300 rounded-full opacity-10 animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 left-1/5 w-16 h-16 bg-orange-300 rounded-full opacity-10 animate-bounce delay-300"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl animate-bounce">
            <Truck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Our Services
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            QuickDrop offers flexible and reliable delivery options to meet your needs—whether personal, business, or urgent.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className={`group relative bg-white p-8 rounded-3xl border-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer overflow-hidden ${
                  isHovered ? 'border-yellow-400 scale-105' : 'border-gray-200 hover:border-yellow-300'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}
              >
                {/* Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${service.color} text-white text-xs font-semibold rounded-full transform transition-all duration-300 ${
                  isHovered ? 'scale-110' : ''
                }`}>
                  {service.badge}
                </div>

                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>

                {/* Icon Container */}
                <div className="relative z-10">
                  <div className={`flex items-center justify-center w-20 h-20 rounded-2xl mb-6 transition-all duration-500 ${
                    isHovered 
                      ? `bg-gradient-to-r ${service.color} shadow-2xl scale-110 rotate-6` 
                      : 'bg-yellow-100 group-hover:bg-yellow-200'
                  }`}>
                    <IconComponent className={`w-10 h-10 transition-all duration-500 ${
                      isHovered ? 'text-white scale-110' : 'text-yellow-500'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                    isHovered ? 'text-yellow-600' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className={`w-4 h-4 rounded-full mr-3 transition-all duration-300 ${
                          isHovered 
                            ? `bg-gradient-to-r ${service.color}` 
                            : 'bg-yellow-300'
                        }`}></div>
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                 
                </div>

                {/* Floating Animation Elements */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full opacity-20 transition-all duration-700 ${
                  isHovered ? 'animate-ping' : ''
                }`}></div>
                <div className={`absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full opacity-20 transition-all duration-700 delay-200 ${
                  isHovered ? 'animate-ping' : ''
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current mx-1" />
              ))}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience Fast, Reliable Delivery?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust QuickDrop for their delivery needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group inline-flex items-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                <span className="mr-3">Book a Delivery Now</span>
                <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center px-8 py-4 text-lg font-medium text-yellow-600 border-2 border-yellow-300 rounded-full hover:bg-yellow-50 transition-all duration-300">
                Get Instant Quote
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              💳 No setup fees • 📱 Instant booking • 🚚 Same-day pickup available
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default index;