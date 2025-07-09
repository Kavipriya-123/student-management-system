import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const userFullName = localStorage.getItem("userFullName") || "User";
    const updateGreetingAndTime = () => {
      const now = new Date();
      const hour = now.getHours();
      let greet = "Hello";

      if (hour < 12) greet = "Good morning";
      else if (hour < 18) greet = "Good afternoon";
      else greet = "Good evening";

      const timeString = now.toLocaleString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setGreeting(`${greet}, ${userFullName}`);
      setCurrentTime(timeString);
    };

    updateGreetingAndTime();
    const intervalId = setInterval(updateGreetingAndTime, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userGender");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        <h1 className="navbar-brand m-0 fw-bold fs-3">STUD-MNG</h1>

        <div className="text-light text-end me-3">
          <div className="fw-semibold">{greeting}</div>
          <div className="small">{currentTime}</div>
        </div>

        <div>
        <button
          onClick={handleLogout}
          className="btn-nav btn btn-light fw-semibold"
          type="button"
        >
          Logout
        </button>
          <img alt="profile" className="user-logo-style" src={localStorage.getItem("userGender")==="Female"?"female.png":"male.png"}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
