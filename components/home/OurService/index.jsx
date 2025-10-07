'use client';
import { useState } from 'react';
import { Truck, Clock, Zap, Shield, Building2, MapPin, ArrowRight, Star } from 'lucide-react';

const ServicesSection = () => {
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
    <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-orange-200 dark:bg-orange-800 rounded-full opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-yellow-300 dark:bg-yellow-700 rounded-full opacity-5"></div>
        <div className="absolute bottom-1/3 left-1/5 w-8 h-8 bg-orange-300 dark:bg-orange-700 rounded-full opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg">
            <Truck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-yellow-500">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            QuickDrop offers flexible and reliable delivery options to meet your needs—whether personal, business, or urgent.
          </p>
        </div>

        {/* Professional Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                className={`group relative bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  isHovered ? 'border-yellow-400 dark:border-yellow-500' : 'hover:border-yellow-300 dark:hover:border-yellow-400'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${service.color} text-white text-xs font-semibold rounded-full transition-transform duration-300 ${
                  isHovered ? 'scale-105' : ''
                }`}>
                  {service.badge}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-16 h-16 rounded-xl mb-4 transition-all duration-300 ${
                    isHovered 
                      ? `bg-gradient-to-r ${service.color} shadow-lg scale-105` 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/50'
                  }`}>
                    <IconComponent className={`w-8 h-8 transition-all duration-300 ${
                      isHovered ? 'text-white scale-105' : 'text-yellow-500 dark:text-yellow-400'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    isHovered ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-400">
                        <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                          isHovered 
                            ? `bg-gradient-to-r ${service.color}` 
                            : 'bg-yellow-400 dark:bg-yellow-500'
                        }`}></div>
                        <span className="text-xs font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} dark:opacity-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
              </div>
            );
          })}
        </div>

        {/* Professional CTA Section */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current mx-1" />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Ready to Experience Fast, Reliable Delivery?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              Join thousands of satisfied customers who trust QuickDrop for their delivery needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button className="group inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="mr-2">Book a Delivery Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center px-6 py-3 text-sm font-medium text-yellow-600 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-500 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300">
                Get Instant Quote
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              No setup fees • Instant booking • Same-day pickup available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;