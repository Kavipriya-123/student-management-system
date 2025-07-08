import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";

const StudentCourse = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    const studentsRes = await axios.get("http://localhost:5000/students-with-courses");
    const coursesRes = await axios.get("http://localhost:5000/api/courses");
    setStudents(studentsRes.data);
    setCourses(coursesRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (studentId, courseId) => {
    await axios.put(`http://localhost:5000/assign-course/${studentId}`, { courseId });
    fetchData(); 
  };

  return (
    <div className="p-4 w-100">
      <h2>Assign Course to Students</h2>
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
  );
};

export default StudentCourse;
