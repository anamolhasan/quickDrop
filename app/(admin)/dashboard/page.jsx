import React from "react";
import ProfilePage from "./profile/page";
import AdminOverviewSection from "./components/Overview";




const Dashboard = () => {
 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
    
      </h1>
      <AdminOverviewSection></AdminOverviewSection>
  
    </div>
  );
};

export default Dashboard;
