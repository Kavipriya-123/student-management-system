import { useState } from "react"

import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

import Dashboard from "../Dashboard"
import Courses from "../Courses"
import StudentCourse from "../StudentCourse"
import About from "../About"
import Studentss from "../Studentss"
import "./index.css"

const Home = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const updatePage = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard changeTab={changeTab}/>;
      case "Students":
        return <Studentss changeTab={changeTab}/>;
      case "Courses":
        return <Courses changeTab={changeTab}/>;
      case "StudentCourse":
        return <StudentCourse changeTab={changeTab}/>;
      case "About":
        return <About changeTab={changeTab}/>;
      default:
        return null;
    }
  };

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  let content;
  try {
    content = updatePage();
  } catch (e) {
    console.log("Server error:", e);
    content = <div className="text-danger p-3">⚠️ Something went wrong. Please try again later.</div>;
  }

  return (
    <div>
    <Navbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
    <div className="d-flex">
      <Sidebar changeTab={changeTab} activeTab={activeTab} sidebarOpen={sidebarOpen} />
      <div className="flex-grow-1 p-3">{content}</div>
    </div>
  </div>

  );
};

export default Home;
