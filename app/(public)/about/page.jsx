import CourierSolutions from "./components/CourierSolutions";
import SendPackage from "./components/SendPackage";

const AboutPage = () => {
  return (
    <div>
      {/* Title Section */}
      <h1 className="text-xl md:text-3xl lg:text-5xl text-center font-bold py-6 md:py-12 text-black bg-white">
        Why <span className="text-blue-500">Quick Drop</span> Courier Service (Pvt.) Ltd
      </h1>

      {/* About Section */}
       <CourierSolutions />

      

      {/* Call to Action */}
       <SendPackage />
    </div>
  );
};

export default AboutPage;
