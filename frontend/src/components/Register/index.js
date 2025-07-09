import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    password: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    axios
      .post("http://localhost:5000/register", formData)
      .then(() => {
        setSuccessMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setErrorMessage("❌ " + err.response.data.message || "Registration failed.");
        } else {
          setErrorMessage("⚠️ Network error. Please check your connection or try again later.");
        }
      });
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img
          src="https://images.unsplash.com/photo-1573164713988-8665fc963095"
          alt="Company background"
          className="register-img"
        />
      </div>

      <div className="register-right">
        <div className="register-form-container shadow rounded p-4">
          <h2 className="register-head text-center mb-3">Create an Account</h2>

          {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3 d-flex gap-3">
              <div className="flex-fill">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="flex-fill">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>

            <p className="mt-3 text-center">
              Already registered?{" "}
              <Link to="/" className="text-decoration-none">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
