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
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-200 dark:bg-orange-800 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 dark:bg-yellow-700 rounded-full opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-yellow-500">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Find quick answers to common questions about QuickDrop's courier and delivery services
          </p>
        </div>

        {/* Professional FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            const IconComponent = faq.icon;
            
            return (
              <div
                key={index}
                className={`group border rounded-2xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300 ${
                  isOpen 
                    ? 'border-yellow-400 dark:border-yellow-500 shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-400'
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isOpen 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md' 
                        : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30'
                    }`}>
                      <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400'
                      }`} />
                    </div>
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      isOpen 
                        ? 'text-yellow-600 dark:text-yellow-400' 
                        : 'text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'bg-yellow-500 dark:bg-yellow-600' 
                      : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className={`w-4 h-4 transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-yellow-600 dark:group-hover:text-yellow-400'
                      }`} />
                    )}
                  </div>
                </button>

                {/* Professional Animated Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`px-6 pb-6 transition-all duration-300 ${
                    isOpen ? 'translate-y-0' : '-translate-y-2'
                  }`}>
                    <div className="w-full h-px bg-gradient-to-r from-yellow-200 via-orange-200 to-transparent dark:from-yellow-700 dark:via-orange-700 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-14">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Help Section */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our support team is here to help you with any additional questions
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:shadow-md transition-all duration-300">
                Contact Support
              </button>
              <button className="px-6 py-3 text-sm font-medium text-yellow-600 dark:text-yellow-400 border border-yellow-400 dark:border-yellow-500 rounded-xl hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;