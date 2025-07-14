import { useEffect, useState } from "react";
import axios from "axios";
import "./index.js"

const StudentCourse = ({ changeTab }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [assigningId, setAssigningId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const studentsRes = await axios.get("http://localhost:5000/students-with-courses");
      const coursesRes = await axios.get("http://localhost:5000/api/courses");
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load data. Please check if the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (studentId, courseId) => {
    try {
      setAssigningId(studentId);
      await axios.put(`http://localhost:5000/assign-course/${studentId}`, { courseId });
      fetchData();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to assign course. Please try again.");
    } finally {
      setAssigningId(null);
    }
  };

  return (
    <div className="cont1 p-4 w-100">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center">
          <i
            className="bi bi-house-fill text-secondary fs-4 me-2"
            role="button"
            title="Back to Dashboard"
            onClick={() => changeTab("Dashboard")}
          ></i>
          <h2 className="m-0 fw-bold text-primary">Assign Course to Students</h2>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
          <div>Loading data...</div>
        </div>
      ) : (<div className="table-wrapper">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Assigned Course</th>
              <th>Assign New Course</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td>{stu.name}</td>
                <td>{stu.email}</td>
                <td>{stu.course_name || "Not Assigned"}</td>
                <td>
                  <select
                    className="form-select"
                    value={stu.course_id || ""}
                    onChange={(e) => handleAssign(stu.id, e.target.value || null)}
                    disabled={assigningId === stu.id}
                  >
                    <option value="">Select Course</option>
                    {courses.map((c) => (
                      <option key={c.ID} value={c.ID}>
                        {c.Name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default StudentCourse;
