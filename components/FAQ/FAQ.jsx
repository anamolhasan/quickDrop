
'use client';
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is QuickDrop?",
          answer: "QuickDrop is a smart courier and delivery system that connects customers with reliable delivery partners to ensure fast, secure, and efficient package delivery across multiple locations. We use advanced technology to optimize routes and provide real-time tracking."
        },
        {
          question: "How does QuickDrop work?",
          answer: "Simply create an account, schedule a pickup by entering sender and receiver details, choose your delivery speed, make payment, and track your package in real-time. Our smart system automatically assigns the best delivery partner for your route."
        },
        {
          question: "What areas do you serve?",
          answer: "QuickDrop currently serves major cities and surrounding areas. We're continuously expanding our network. Check our coverage area on the homepage or contact support to confirm delivery to your specific location."
        }
      ]
    },
    {
      category: "Delivery & Pricing",
      questions: [
        {
          question: "How much does delivery cost?",
          answer: "Our pricing depends on distance, package size, weight, and delivery speed. We offer Standard (24-48 hours), Express (same day), and Priority (2-4 hours) options. Get an instant quote by entering your pickup and delivery details."
        },
        {
          question: "What delivery options are available?",
          answer: "We offer three delivery speeds: Standard Delivery (24-48 hours), Express Delivery (same day), and Priority Delivery (2-4 hours). You can also schedule deliveries for specific time slots based on availability."
        },
        {
          question: "What can I send through QuickDrop?",
          answer: "You can send documents, parcels, food items, gifts, and most consumer goods. We don't accept hazardous materials, illegal items, perishables without proper packaging, or items exceeding 50kg without prior arrangement."
        },
        {
          question: "Is there a weight or size limit?",
          answer: "Standard deliveries accept packages up to 25kg and dimensions of 60cm x 60cm x 60cm. For larger or heavier items, contact our support team for custom delivery solutions and pricing."
        }
      ]
    },
    {
      category: "Tracking & Security",
      questions: [
        {
          question: "How can I track my package?",
          answer: "Once your package is picked up, you'll receive a unique tracking ID via SMS and email. Use this ID on our website or app to get real-time updates including pickup, transit, and delivery status with GPS location."
        },
        {
          question: "Are my packages insured?",
          answer: "All packages are automatically covered up to $100 at no extra cost. You can purchase additional insurance coverage during booking for higher-value items. We also provide secure handling and proof of delivery."
        },
        {
          question: "What if my package gets lost or damaged?",
          answer: "In the rare event of loss or damage, report it within 24 hours through our support system. We'll investigate immediately and provide compensation as per our insurance policy. Most claims are resolved within 3-5 business days."
        }
      ]
    },
    {
      category: "Account & Payment",
      questions: [
        {
          question: "Do I need to create an account?",
          answer: "While you can book deliveries as a guest, creating an account offers benefits like order history, saved addresses, loyalty rewards, priority support, and easier rebooking of frequent routes."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit/debit cards, digital wallets (PayPal, Apple Pay, Google Pay), bank transfers, and cash on delivery (where available). Business accounts can also set up monthly billing."
        },
        {
          question: "Can I get a refund?",
          answer: "Refunds are available if you cancel before pickup (full refund) or if we fail to meet our delivery commitment. Processing time is 3-5 business days. Partial refunds may apply for service issues based on our terms."
        }
      ]
    },
    {
      category: "Business & Partnership",
      questions: [
        {
          question: "Do you offer business solutions?",
          answer: "Yes! We provide customized solutions for businesses including bulk delivery discounts, API integration, dedicated account managers, branded packaging options, and flexible billing arrangements. Contact our business team for details."
        },
        {
          question: "How can I become a delivery partner?",
          answer: "Join our delivery network by applying through our Partner Portal. Requirements include valid license, vehicle insurance, smartphone, and background check. We offer competitive earnings, flexible schedules, and performance bonuses."
        },
        {
          question: "Is there an API for integration?",
          answer: "Yes, we offer RESTful APIs for businesses to integrate QuickDrop services into their platforms. Our API supports order creation, tracking, webhooks, and account management. Developer documentation and sandbox environment are available."
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Find quick answers to common questions about QuickDrop's courier and delivery services
          </p>
        </div>

        {/* FAQ Categories */}
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            {/* Category Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-primary border-b-2 border-primary/20 pb-2">
                {category.category}
              </h3>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
              {category.questions.map((faq, questionIndex) => {
                const globalIndex = `${categoryIndex}-${questionIndex}`;
                const isOpen = openIndex === globalIndex;

                return (
                  <div 
                    key={questionIndex} 
                    className="collapse collapse-plus bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300"
                  >
                    <input
                      type="radio"
                      name={`faq-${categoryIndex}`}
                      checked={isOpen}
                      onChange={() => toggleFAQ(globalIndex)}
                      className="peer"
                    />
                    
                    <div 
                      className="collapse-title text-lg font-medium text-base-content cursor-pointer hover:text-primary transition-colors duration-200"
                      onClick={() => toggleFAQ(globalIndex)}
                    >
                      {faq.question}
                    </div>
                    
                    <div className="collapse-content text-base-content/80">
                      <p className="pt-2 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Contact Support Section */}
       
      </div>
    </section>
  );
};

export default FAQ;