import React from "react";
import Overview from "./components/Overview";


const Dashboard = () => {
 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Overview
      </h1>

     <Overview />
    </div>
  );
};

export default Dashboard;
