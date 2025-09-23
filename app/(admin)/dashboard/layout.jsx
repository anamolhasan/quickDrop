import { DashboardSidebar } from "@/components/admin";
import React, { Children } from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="lg:flex-row flex flex-col h-screen">
      <div className="lg:w-[18%] h-16 lg:h-full bg-amber-50">
        <DashboardSidebar />
      </div>
      <div className="lg:w-[82%] h-full bg-gray-50 overflow-y-auto p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
