import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="w-[20%] h-full min-h-screen max-h-screen fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="w-[80%] ml-[20%]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
