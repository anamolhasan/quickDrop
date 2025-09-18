

const page = () => {
    return (
        <div>
      <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-bold py-5 md:py-10">
        Why <span className="text-blue-400">Quick Drop</span> Courier Service (Pvt.) Ltd
      </h1>

       <section className=" py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Text Section */}
        <div>
         
          <p className="leading-relaxed mb-6">
            Quick Drop Courier is a modern courier and delivery platform designed 
            to make sending and receiving parcels safe, fast, and hassle-free. 
            With advanced tracking technology, reliable delivery partners, and 
            affordable rates, we ensure your packages always arrive on time.
          </p>
          <p className="leading-relaxed">
            Our mission is to simplify logistics for both businesses and individuals 
            by providing secure, efficient, and trustworthy delivery solutions. 
            Your trust is our greatest strength.
          </p>

          {/* <div className="mt-6">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
              Learn More
            </button>
          </div> */}

        </div>

        {/* Image Section */}
        {/* <div className="flex justify-center">
          <img
            src="/courier-delivery.svg"
            alt="Quick Drop Courier"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div> */}

      </div>
    </section>
    </div>
    );
};

export default page;