import { useState } from "react"

import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

import Dashboard from "../Dashboard"
import Courses from "../Courses"
import StudentCourse from "../StudentCourse"
import About from "../About"
import Studentss from "../Studentss"

const Home = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const updatePage = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Students":
        return <Studentss />;
      case "Courses":
        return <Courses />;
      case "StudentCourse":
        return <StudentCourse />;
      case "About":
        return <About />;
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
    <Navbar />
    <div className="d-flex home-layout">
      <Sidebar changeTab={changeTab} activeTab={activeTab} />
      <div className="main-content-area flex-grow-1 p-3">{content}</div>
    </div>
  </div>

  );
};

export default Home;
