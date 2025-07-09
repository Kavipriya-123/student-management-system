import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", formData)
      .then((res) => {
        const { token,user } = res.data;
        Cookies.set("jwtToken", token);
          localStorage.setItem("userFullName", user.fullName);
          localStorage.setItem("userGender",user.gender);
        setMessage({ type: "success", text: "Login successful! Redirecting..." });
        setTimeout(() => navigate("/home"), 1500);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ type: "danger", text: "Invalid email or password" });
      });
  };

  return (
    <div className="login-container d-flex vh-100">
      {/* Left Form Side */}
      <div className="login-left d-flex align-items-center justify-content-center">
        <div className="login-box p-4 shadow rounded bg-white">
          <h2 className="login-head1 text-center mb-3">🔐 Welcome Back</h2>
          <p className="login-subhead text-center mb-4">Please log in to your account</p>

          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label login-label">Email</label>
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
              <label className="form-label login-label">Password</label>
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

          <p className="mt-3 text-center login-signup">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="login-right d-none d-md-block">
        <img
          src="https://images.unsplash.com/photo-1560264280-88b68371db39"
          alt="Login Illustration"
          className="login-img"
        />
      </div>
    </div>
  );
};

export default Login;
