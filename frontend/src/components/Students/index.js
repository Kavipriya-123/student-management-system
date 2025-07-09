import axios from "axios";
import { useState, useEffect } from "react";

const Students = () => {
  const [stud, setStud] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/");
      setStud(res.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to fetch students. Check server or network.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:5000/update/" + id, { name, email, phone });
      setUpdate(false);
      setName("");
      setEmail("");
      setPhone("");
      getData();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to update student. Please try again.");
    }
  };

  const setUpdateStatus = (id) => {
    const selected = stud.find(stu => stu.ID === id);
    if (selected) {
      setId(id);
      setName(selected.Name);
      setEmail(selected.Email);
      setPhone(selected.phone);
      setUpdate(true);
    }
  };

  return (
    <div className="dashboard p-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {isUpdate ? (
        <form onSubmit={handleUpdate} className="border p-4 rounded bg-light">
          <h2>Update Student</h2>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Enter Phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success me-2">Update</button>
          <button
            className="btn btn-secondary"
            onClick={() => setUpdate(false)}
            type="button"
          >
            Cancel
          </button>
        </form>
      ) : loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
          <div>Loading students...</div>
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stud.map((data, i) => (
              <tr key={i}>
                <td>{data.ID}</td>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>{data.phone}</td>
                <td>
                  <button
                    onClick={() => setUpdateStatus(data.ID)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Students;
