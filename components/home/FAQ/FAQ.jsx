'use client';
import { useState } from 'react';
import { Plus, Minus, Package, Clock, Shield, MapPin, CreditCard, Search } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is QuickDrop?",
      answer: "QuickDrop is a smart courier and delivery system that connects customers with reliable delivery partners to ensure fast, secure, and efficient package delivery across multiple locations. We use advanced technology to optimize routes and provide real-time tracking.",
      icon: Package
    },
    {
      question: "How does QuickDrop work?",
      answer: "Simply create an account, schedule a pickup by entering sender and receiver details, choose your delivery speed, make payment, and track your package in real-time. Our smart system automatically assigns the best delivery partner for your route.",
      icon: Search
    },
    {
      question: "How much does delivery cost?",
      answer: "Our pricing depends on distance, package size, weight, and delivery speed. We offer Standard (24-48 hours), Express (same day), and Priority (2-4 hours) options. Get an instant quote by entering your pickup and delivery details.",
      icon: CreditCard
    },
    {
      question: "What delivery options are available?",
      answer: "We offer three delivery speeds: Standard Delivery (24-48 hours), Express Delivery (same day), and Priority Delivery (2-4 hours). You can also schedule deliveries for specific time slots based on availability.",
      icon: Clock
    },
    {
      question: "How can I track my package?",
      answer: "Once your package is picked up, you'll receive a unique tracking ID via SMS and email. Use this ID on our website or app to get real-time updates including pickup, transit, and delivery status with GPS location.",
      icon: MapPin
    },
    {
      question: "Are my packages insured?",
      answer: "All packages are automatically covered up to $100 at no extra cost. You can purchase additional insurance coverage during booking for higher-value items. We also provide secure handling and proof of delivery.",
      icon: Shield
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg animate-bounce">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find quick answers to common questions about QuickDrop's courier and delivery services
          </p>
        </div>

        {/* Enhanced FAQ Items */}
        <div className="space-y-6">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            const IconComponent = faq.icon;
            
            return (
              <div
                key={index}
                className={`group border-2 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isOpen 
                    ? 'border-yellow-400 shadow-yellow-100' 
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards'
                }}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg scale-110' 
                        : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-yellow-100 group-hover:to-orange-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-gray-600 group-hover:text-yellow-600'
                      }`} />
                    </div>
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                      isOpen 
                        ? 'text-yellow-600' 
                        : 'text-gray-900 group-hover:text-yellow-600'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'bg-yellow-500 rotate-180 scale-110' 
                      : 'bg-gray-100 group-hover:bg-yellow-100 group-hover:scale-110'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className={`w-5 h-5 transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-gray-600 group-hover:text-yellow-600'
                      }`} />
                    )}
                  </div>
                </button>

                {/* Enhanced Animated Answer */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-6 pb-6 transition-all duration-500 ${
                    isOpen ? 'translate-y-0' : '-translate-y-4'
                  }`}>
                    <div className="w-full h-px bg-gradient-to-r from-yellow-200 via-orange-200 to-transparent mb-4"></div>
                    <p className="text-gray-700 leading-relaxed text-lg pl-16">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
      
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default FAQ;