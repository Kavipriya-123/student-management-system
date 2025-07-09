import "./index.css";
import axios from "axios";
import { useState } from "react";

const AddStudents = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await axios.post("http://localhost:5000/create", { name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      setSuccessMsg("✅ Student added successfully!");
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-cont p-4">
      <form onSubmit={handleSubmit} className="border rounded p-4 bg-light">
        <h2 className="mb-4">Add Student</h2>

        {successMsg && (
          <div className="alert alert-success" role="alert">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="mb-3">
          <label>Name</label>
          <input
            value={name}
            type="text"
            placeholder="Enter Name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Enter Phone Number"
            className="form-control"
            required
          />
        </div>

        <button className="btn btn-success w-100" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddStudents;
