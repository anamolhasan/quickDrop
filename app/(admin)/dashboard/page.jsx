import React from "react";
import ProfilePage from "./profile/page";




const Dashboard = () => {
 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Overview
      </h1>
      <ProfilePage/>
  
    </div>
  );
};

export default Dashboard;
