import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import "./index.css";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const currentTab = location.pathname.split("/")[2] || "Dashboard";

  const changeTab = (tabName) => {
    navigate(`/home/${tabName}`);
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <div className="d-flex">
        <Sidebar changeTab={changeTab} activeTab={currentTab} sidebarOpen={sidebarOpen} />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
