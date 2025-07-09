import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [stud, setStud] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/");
        console.log("Student data:", res.data);
        setStud(res.data);
      } catch (err) {
        console.log(err);
        setError("⚠️ Unable to connect to the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setStud(prev => prev.filter(student => student.ID !== id));
    } catch (e) {
      console.log(e);
      setError("❌ Failed to delete. Server may be down.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard p-4">
      <h2 className="mb-4">Student Dashboard</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
          <div>Loading students...</div>
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
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
                    onClick={() => handleDelete(data.ID)}
                    className="btn btn-danger"
                    disabled={deletingId === data.ID}
                  >
                    {deletingId === data.ID ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {stud.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">No student records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
