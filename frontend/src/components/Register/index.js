import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
      .then((res) => {
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
    <div className="mt-5 d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="bg-white p-4 rounded shadow w-50">
        <h2 className="mb-4 text-center">Register</h2>

        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter contact number"
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-success" type="submit">
              Register
            </button>
          </div>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
