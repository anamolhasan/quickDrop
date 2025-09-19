import React from 'react';

const page = () => {

     const plans = [
    {
      name: "Basic",
      price: "৳50",
      description: "For individual users sending occasional parcels",
      features: [
        "Create & track orders",
        "Real-time tracking",
        "Instant notifications",
      ],
    },
    {
      name: "Business",
      price: "৳200",
      description: "For small businesses with regular deliveries",
      features: [
        "Multi-parcel management",
        "Route optimization",
        "Pickup window reservation",
        "Delivery analytics",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large businesses & high-volume clients",
      features: [
        "All Business features",
        "Smart reattempt logic",
        "Insurance suggestions",
        "Dedicated support & dashboard",
      ],
    },
  ];


    return (
        <div className='min-h-screen'>
             <section className="relative bg-gray-50 dark:bg-gray-900 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-12">
          QuickDrop Pricing
        </h1>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h2>
                <p className="text-yellow-500 text-3xl font-extrabold mb-4">
                  {plan.price}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>

                <ul className="text-gray-700 dark:text-gray-200 mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-yellow-500 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-auto w-full px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-white font-semibold">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
        </div>
    );
};

export default page;