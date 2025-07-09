import { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ name: "", instructor: "", duration: "", id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);     
  const [error, setError] = useState("");           

  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Unable to fetch courses. Please check server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/courses/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/courses", formData);
      }
      fetchCourses();
      setFormData({ name: "", instructor: "", duration: "", id: null });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to save course. Please try again.");
    }
  };

  const handleEdit = (course) => {
    setFormData({
      name: course.Name,
      instructor: course.Instructor,
      duration: course.duration,
      id: course.ID
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to delete course. Please try again.");
    }
  };

  return (
    <div className="p-4 w-100">
      <h2>Courses</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Course Name"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          placeholder="Instructor"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Course" : "Add Course"}
        </button>
      </form>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <div>Loading courses...</div>
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Course Id</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.ID}>
                <td>{course.ID}</td>
                <td>{course.Name}</td>
                <td>{course.Instructor}</td>
                <td>{course.duration}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(course)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course.ID)}>
                    Delete
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

export default Courses;
