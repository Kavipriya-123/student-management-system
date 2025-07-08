import "./index.css";
import axios from "axios";
import { useState } from "react";

const AddStudents = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/create", { name, email, phone })
      .then(res => {
        console.log(res);
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="add-student-cont">
      <form onSubmit={handleSubmit}>
        <h2>Add Student</h2>

        <div className="mb-2">
          <label>Name</label>
          <input
            value={name}
            type="text"
            placeholder="Enter Name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            placeholder="Enter Phone Number"
            className="form-control"
          />
        </div>

        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default AddStudents;
