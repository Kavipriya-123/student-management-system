import "./index.css";
import Cookies from "js-cookie"
import {useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();

    const handleLogout=()=>{
        Cookies.remove("jwtToken");
        navigate("/");
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-3 shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className="navbar-brand m-0 fw-bold fs-3">STUD-MNG</h1>
        <button onClick={handleLogout} className="btn-nav btn btn-light fw-semibold" type="button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
