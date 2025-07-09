import "./index.css";

const Sidebar = ({changeTab,activeTab}) => {

  return (
    <div className="sidebar bg-light vh-100 shadow-sm p-3">
      <ul className="list-unstyled">
        <li className={`sidebar-item mb-3 fw-semibold ${activeTab==="Dashboard" && "activeTabStyle"}`} onClick={()=>changeTab("Dashboard")} >
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </li>
        <li onClick={()=>changeTab("Students")} className={`sidebar-item mb-3 fw-semibold ${activeTab==="Students" && "activeTabStyle"}`}>
          <i className="bi bi-people-fill me-2"></i> Students
        </li>
        <li onClick={()=>changeTab("Courses")} className={`sidebar-item mb-3 fw-semibold ${activeTab==="Courses" && "activeTabStyle"}`}>
          <i className="bi bi-person-plus-fill me-2"></i> Courses
        </li>
        <li onClick={()=>changeTab("StudentCourse")} className={`sidebar-item mb-3 fw-semibold ${activeTab==="StudentCourse" && "activeTabStyle"}`}>
          <i className="bi bi-person-plus-fill me-2"></i> Stud-Course
        </li>
        <li onClick={()=>changeTab("About")} className={`sidebar-item mb-3 fw-semibold ${activeTab==="About" && "activeTabStyle"}`}>
          <i className="bi bi-person-plus-fill me-2"></i> About
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
