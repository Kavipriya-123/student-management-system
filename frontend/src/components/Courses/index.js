import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ name: "", instructor: "", duration: "", id: null });
    const [isEditing, setIsEditing] = useState(false);

    const fetchCourses = async () => {
        const res = await axios.get("http://localhost:5000/api/courses");
      console.log(res);
        setCourses(res.data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await axios.put(`http://localhost:5000/api/courses/${formData.id}`, formData);
        } else {
            await axios.post("http://localhost:5000/api/courses", formData);
        }
        fetchCourses();
        setFormData({ name: "", instructor: "", id: null ,duration:""});
        setIsEditing(false);
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
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        fetchCourses();
    };

    return (
        <div className="p-4 w-100">
            <h2>Courses</h2>
            
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
        </div>
    );
};

export default Courses;
