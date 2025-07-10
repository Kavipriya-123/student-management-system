import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./index.css";

const Studentss = ({ changeTab }) => {
  const [stud, setStud] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", id: null });
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/");
      setStud(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setFormData({ name: "", email: "", phone: "", id: null });
    setIsUpdate(false);
    setModalOpen(true);
  };

  const openUpdateModal = (student) => {
    setFormData({
      name: student.Name,
      email: student.Email,
      phone: student.phone,
      id: student.ID,
    });
    setIsUpdate(true);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdate) {
        await axios.put(`http://localhost:5000/update/${formData.id}`, formData);
        showSuccess("✅ Student Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/create", formData);
        showSuccess("✅ Student Added Successfully!");
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete/${confirmDeleteId}`);
      showSuccess("✅ Student Deleted Successfully!");
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setShowConfirmModal(false);
      setConfirmDeleteId(null);
    }
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
    setShowConfirmModal(true);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="cont1 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center">
          <i
            className="bi bi-house-fill text-secondary fs-4 me-2"
            role="button"
            title="Back to Dashboard"
            onClick={() => changeTab("Dashboard")}
          ></i>
          <h2 className="m-0 fw-bold text-primary">Manage Students</h2>
        </div>
        <button title="Add new student" className="btn btn-success mt-3 mt-md-0" onClick={openAddModal}>
          Add Student +
        </button>
      </div>

      {successMessage && (
        <div className="success-toast">
          <div className="checkmark">✔</div>
          <div className="toast-text">{successMessage}</div>
        </div>
      )}

      <div className="bg-white rounded p-3 position-relative table-flow-control">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stud.map((data, i) => (
              <tr key={i}>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>{data.phone}</td>
                <td>
                  <button title="Edit" className="icon-style" onClick={() => openUpdateModal(data)}>
                    <FaEdit />
                  </button>
                  <button title="Delete"
                    className="icon-style delete-icon ms-2"
                    onClick={() => confirmDelete(data.ID)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h4>{isUpdate ? "Update Student" : "Add Student"}</h4>
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Email"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control mb-3"
                  placeholder="Phone"
                  required
                />
                <div className="d-flex justify-content-between">
                  <button className="btn btn-success" type="submit">
                    {isUpdate ? "Update" : "Add"}
                  </button>
                  <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h5 className="mb-3 text-danger">Confirm Deletion</h5>
              <p>Are you sure you want to delete this student? This action cannot be undone.</p>
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studentss;
