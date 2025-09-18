'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Clock, DollarSign, Bike, Shield, Star, Upload, User, Mail, Phone, MapPin, Car, FileText, Award, TrendingUp, Users, ArrowRight } from 'lucide-react';

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form Submitted:', data);
    setIsSubmitting(false);
    setShowSuccess(true);
    reset();
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const benefits = [
    {
      icon: Clock,
      title: "Flexible Schedule",
      desc: "Work when you want, choose your own shifts, and balance your lifestyle perfectly.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      stat: "24/7 Availability"
    },
    {
      icon: DollarSign,
      title: "Great Earnings",
      desc: "Competitive pay with bonuses for peak hours and consistent performance rewards.",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      stat: "$15-25/hour"
    },
    {
      icon: Bike,
      title: "Smart Routes",
      desc: "AI-powered route optimization saves time, fuel, and increases your efficiency.",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      stat: "30% Faster"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      desc: "Insurance coverage and 24/7 support ensure peace of mind on every delivery.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
      stat: "100% Protected"
    }
  ];

  const steps = [
    { step: "01", title: "Apply Online", desc: "Fill out the rider application form with your details and documents.", icon: User },
    { step: "02", title: "Get Verified", desc: "Background check and document verification within 24-48 hours.", icon: Shield },
    { step: "03", title: "Start Delivering", desc: "Accept delivery requests via the Rider App and start earning.", icon: Bike },
    { step: "04", title: "Earn Money", desc: "Get weekly payouts and performance bonuses directly to your account.", icon: DollarSign }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 text-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-orange-300 rounded-full opacity-10 animate-bounce delay-700"></div>
      </div>

      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 max-w-7xl relative z-10">
        {/* LEFT SIDE - Enhanced Application Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 self-start border border-gray-200 relative overflow-hidden">
          {/* Form Header Animation */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center animate-bounce">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <span className="text-green-700 font-medium">Application submitted successfully! We'll contact you soon.</span>
            </div>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg animate-bounce">
              <Bike className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Be A Rider
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 text-lg">
              Fill in the details below to join our amazing rider community.
            </p>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div className="group">
              <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.fullName.message}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email.message}</p>}
              </div>
              <div className="group">
                <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.phone.message}</p>}
              </div>
            </div>

            {/* City & Vehicle Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  City
                </label>
                <input
                  type="text"
                  {...register('city', { required: 'City is required' })}
                  className="w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300"
                  placeholder="Your city"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.city.message}</p>}
              </div>
              <div className="group">
                <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                  <Car className="w-4 h-4 inline mr-2" />
                  Vehicle Type
                </label>
                <select
                  {...register('vehicleType', { required: 'Vehicle type is required' })}
                  className="w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300"
                >
                  <option value="">Select Vehicle</option>
                  <option value="bike">🏍️ Bike</option>
                  <option value="scooter">🛵 Scooter</option>
                  <option value="car">🚗 Car</option>
                  <option value="van">🚐 Van</option>
                </select>
                {errors.vehicleType && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.vehicleType.message}</p>}
              </div>
            </div>

            {/* License Number */}
            <div className="group">
              <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                <FileText className="w-4 h-4 inline mr-2" />
                License Number
              </label>
              <input
                type="text"
                {...register('licenseNumber', { required: 'License number is required' })}
                className="w-full p-4 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300"
                placeholder="Enter your license number"
              />
              {errors.licenseNumber && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.licenseNumber.message}</p>}
            </div>

            {/* File Uploads */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Insurance
                </label>
                <input
                  type="file"
                  {...register('insurance', { required: 'Insurance document is required' })}
                  className="w-full p-3 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                {errors.insurance && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.insurance.message}</p>}
              </div>
              <div className="group">
                <label className="block font-semibold mb-2 text-gray-700 group-focus-within:text-yellow-600 transition-colors">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload ID Proof
                </label>
                <input
                  type="file"
                  {...register('idProof', { required: 'ID Proof is required' })}
                  className="w-full p-3 border-2 rounded-2xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-400 transition-all duration-300 hover:border-yellow-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
                {errors.idProof && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.idProof.message}</p>}
              </div>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full py-5 text-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Processing Application...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Submit Application
                  <ArrowRight className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
                      </div>
        </div>

        {/* RIGHT SIDE - Enhanced Content */}
        <div className="space-y-16">
          {/* Enhanced Hero */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Star className="w-4 h-4 mr-2" />
              Join 10,000+ Happy Riders
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Earn More.<br />Deliver Smarter.
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Join QuickDrop as a Rider and enjoy flexible hours, competitive earnings, and smart route optimization that maximizes your income.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300">
                <span className="mr-2">Apply Now</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center px-6 py-4 text-lg font-medium text-gray-700 border-2 border-gray-300 rounded-full hover:border-yellow-400 hover:text-yellow-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Enhanced Benefits */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center lg:text-left">Why Become a QuickDrop Rider?</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((item, i) => {
                const IconComponent = item.icon;
                const isHovered = hoveredBenefit === i;
                
                return (
                  <div
                    key={i}
                    className={`group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden ${
                      isHovered ? 'border-yellow-400 scale-105' : 'border-gray-200 hover:border-yellow-300'
                    }`}
                    onMouseEnter={() => setHoveredBenefit(i)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                    style={{
                      animationDelay: `${i * 200}ms`,
                      animation: 'slideInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isHovered 
                            ? `bg-gradient-to-r ${item.color} shadow-2xl scale-110` 
                            : 'bg-yellow-100 group-hover:bg-yellow-200'
                        }`}>
                          <IconComponent className={`w-8 h-8 transition-all duration-500 ${
                            isHovered ? 'text-white' : 'text-yellow-500'
                          }`} />
                        </div>
                        <div className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-semibold rounded-full`}>
                          {item.stat}
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        isHovered ? 'text-yellow-600' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Requirements */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center lg:text-left">Requirements</h2>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200">
              <ul className="space-y-4">
                {[
                  "Valid driver's license & vehicle documents",
                  "Smartphone with QuickDrop Rider app",
                  "Background check clearance",
                  "Proof of insurance (where applicable)"
                ].map((req, i) => (
                  <li key={i} className="flex items-center text-gray-700 text-lg group hover:text-yellow-600 transition-colors duration-300">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-yellow-200 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-yellow-500" />
                    </div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enhanced How It Works */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center lg:text-left">How It Works</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((step, i) => {
                const IconComponent = step.icon;
                const isHovered = hoveredStep === i;
                
                return (
                  <div
                    key={i}
                    className={`group bg-white/90 backdrop-blur-sm p-8 rounded-3xl border-2 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden ${
                      isHovered ? 'border-yellow-400 scale-105' : 'border-gray-200 hover:border-yellow-300'
                    }`}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                    style={{
                      animationDelay: `${i * 150}ms`,
                      animation: 'slideInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-3xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className={`text-3xl font-bold mr-4 transition-all duration-300 ${
                          isHovered ? 'text-yellow-600 scale-110' : 'text-yellow-500'
                        }`}>
                          {step.step}
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isHovered 
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg scale-110' 
                            : 'bg-yellow-100 group-hover:bg-yellow-200'
                        }`}>
                          <IconComponent className={`w-6 h-6 transition-all duration-500 ${
                            isHovered ? 'text-white' : 'text-yellow-600'
                          }`} />
                        </div>
                      </div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                        isHovered ? 'text-yellow-600' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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

export default page;