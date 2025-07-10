import "./index.css";
import { useState } from "react";

const Sidebar = ({ changeTab, activeTab }) => {
  const [expanded, setExpanded] = useState(false);
 

  return (
    <div
  className={`sidebar d-flex flex-column shadow-sm ${expanded ? "expanded" : "collapsed"}`}
  onMouseEnter={() => setExpanded(true)}
  onMouseLeave={() => setExpanded(false)}
>
  <ul className="list-unstyled m-0 p-2 sidebar-nav">
        
        <li
          className={`sidebar-item ${activeTab === "Dashboard" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("Dashboard")}
        >
          <i className="bi bi-speedometer2"></i>
          {expanded && <span>Dashboard</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "Students" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("Students")}
        >
          <i className="bi bi-people-fill"></i>
          {expanded && <span>Students</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "Courses" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("Courses")}
        >
          <i className="bi bi-journal-code"></i>
          {expanded && <span>Courses</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "StudentCourse" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("StudentCourse")}
        >
          <i className="bi bi-link-45deg"></i>
          {expanded && <span>Stud-Course</span>}
        </li>
        <li
          className={`sidebar-item ${activeTab === "About" ? "activeTabStyle" : ""}`}
          onClick={() => changeTab("About")}
        >
          <i className="bi bi-info-circle-fill"></i>
          {expanded && <span>About</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
