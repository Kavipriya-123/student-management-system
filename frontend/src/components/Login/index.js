import {  useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", formData)
      .then((res) => {
        const { token } = res.data;
        Cookies.set("jwtToken", token);
        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid email or password");
      });
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="bg-white p-5 rounded shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login to Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
