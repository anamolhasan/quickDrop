"use client";
import React, { useState } from 'react';
import { Package, Scale, MapPin, Calculator, Check, Zap } from 'lucide-react';

const PricingSection = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [weight, setWeight] = useState(1);

  const pricingData = [
    {
      type: 'document',
      title: 'Document Delivery',
      description: 'Perfect for letters, contracts, certificates and important papers',
      icon: Package,
      withinCity: 60,
      outsideCity: 80,
      weightLimit: 'Any weight',
      features: ['Any document type', 'Secure handling', 'Digital receipt', '24/7 support']
    },
    {
      type: 'non-document',
      title: 'Small Package',
      description: 'Ideal for small items, gifts, products up to 3kg',
      icon: Scale,
      withinCity: 110,
      outsideCity: 150,
      weightLimit: 'Up to 3kg',
      features: ['Up to 3kg', 'Fragile handling', 'Real-time tracking', 'Package protection']
    }
  ];

  const calculateAdditionalCost = (basePrice, isOutsideCity) => {
    if (weight <= 3) return basePrice;
    
    const additionalKg = Math.ceil(weight - 3);
    let additionalCost = additionalKg * 40;
    
    if (isOutsideCity && weight > 3) {
      additionalCost += 40; // Extra charge for outside city
    }
    
    return basePrice + additionalCost;
  };

  const filteredPricing = selectedType === 'all' 
    ? pricingData 
    : pricingData.filter(item => item.type === selectedType);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-orange-200 dark:bg-orange-800 rounded-full opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {/* <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent <span className="text-yellow-500">Pricing</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Simple, affordable pricing with no hidden fees. Calculate your delivery cost instantly.
          </p>
        </div> */}

        {/* Filters and Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Package Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Package Type
              </label>
              <div className="flex gap-3">
                {[
                  { value: 'all', label: 'All Types' },
                  { value: 'document', label: 'Documents' },
                  { value: 'non-document', label: 'Packages' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedType(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedType === filter.value
                        ? 'bg-yellow-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Calculator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Package Weight: <span className="text-yellow-600 dark:text-yellow-400 font-bold">{weight}kg</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setWeight(Math.max(1, weight - 0.5))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setWeight(Math.min(10, weight + 0.5))}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>1kg</span>
                <span>10kg</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {weight > 3 && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center text-sm text-yellow-800 dark:text-yellow-200">
                <Zap className="w-4 h-4 mr-2" />
                <span>Additional ৳40/kg for packages over 3kg + ৳40 extra for outside city delivery</span>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredPricing.map((plan, index) => {
            const IconComponent = plan.icon;
            const withinCityPrice = plan.type === 'non-document' 
              ? calculateAdditionalCost(plan.withinCity, false)
              : plan.withinCity;
            
            const outsideCityPrice = plan.type === 'non-document'
              ? calculateAdditionalCost(plan.outsideCity, true)
              : plan.outsideCity;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {plan.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {plan.weightLimit}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ৳{withinCityPrice}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Within City</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ৳{outsideCityPrice}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Outside City</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Book This Delivery
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              💡 Need help calculating?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              For packages over 10kg or special items, contact our support team for a custom quote.
              We offer competitive rates for bulk deliveries and business partnerships.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default PricingSection;