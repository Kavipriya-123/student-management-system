import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./index.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ name: "", instructor: "", duration: "", id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


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

  const openAddModal = () => {
    setFormData({ name: "", instructor: "", duration: "", id: null });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setFormData({
      name: course.Name,
      instructor: course.Instructor,
      duration: course.duration,
      id: course.ID
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/courses/${formData.id}`, formData);
        showSuccess("✅ Course updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/courses", formData);
        showSuccess("✅ Course added successfully!");
      }
      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to save course. Please try again.");
    }
  };

    const handleDelete = async () => {
    try {
        await axios.delete(`http://localhost:5000/api/courses/${confirmDeleteId}`);
        showSuccess("✅ Course deleted successfully!");
        fetchCourses();
    } catch (err) {
        console.error(err);
        setError("❌ Failed to delete course. Please try again.");
    } finally {
        setShowConfirmModal(false);
        setConfirmDeleteId(null);
    }
    };


  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="container p-4 ">
      <h2>Courses</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {successMessage && (
        <div className="success-toast">
          <div className="checkmark">✔</div>
          <div className="toast-text">{successMessage}</div>
        </div>
      )}

      <button className="btn btn-success mb-3" onClick={openAddModal}>
        Add Course +
      </button>

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
                  <button
                    className="icon-style"
                    onClick={() => openEditModal(course)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="icon-style delete-icon"
                    onClick={() => {
                    setConfirmDeleteId(course.ID);
                    setShowConfirmModal(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{isEditing ? "Update Course" : "Add Course"}</h4>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Course Name"
                required
              />
              <input
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Instructor"
                required
              />
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Duration"
                required
              />
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary" type="submit">
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal-overlay">
            <div className="modal-content">
            <h5 className="mb-3 text-danger">Confirm Deletion</h5>
            <p>Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
                </button>
                <button
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
                >
                Cancel
                </button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
};

export default Courses;
