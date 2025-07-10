import "./index.css";
import { useState } from "react";

const Sidebar = ({ changeTab, activeTab, sidebarOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = sidebarOpen || isHovered;

  return (
    <div
      className={`sidebar d-flex flex-column shadow-sm ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul className="list-unstyled m-0 p-2 sidebar-nav">
        <li
          className={`sidebar-item ${activeTab === "Dashboard" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("Dashboard")}
        >
          <i className="bi bi-speedometer2"></i>
          {isExpanded && <span>Dashboard</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "Students" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("Students")}
        >
          <i className="bi bi-people-fill"></i>
          {isExpanded && <span>Students</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "Courses" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("Courses")}
        >
          <i className="bi bi-journal-code"></i>
          {isExpanded && <span>Courses</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "StudentCourse" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("StudentCourse")}
        >
          <i className="bi bi-link-45deg"></i>
          {isExpanded && <span>Stud-Course</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>About</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About12" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About1")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>Work-1</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About12" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About1")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>Work-2</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About12" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About1")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>Work-3</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About12" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About1")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>Work-4</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About12" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About1")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>Work-5</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About12" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About1")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {isExpanded && <span>Work-6</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
