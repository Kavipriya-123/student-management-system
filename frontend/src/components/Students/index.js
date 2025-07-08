import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Students = () => {
  const [stud, setStud] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const getData = () => {
    axios.get("http://localhost:5000/")
      .then(res => setStud(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put("http://localhost:5000/update/" + id, { name, email, phone })
      .then(res => {
        console.log(res);
        setUpdate(false);
        setName("");
        setEmail("");
        setPhone("");
        getData();
      }).catch(err => console.log(err));
  };

  const setUpdateStatus = (id) => {
    const selected = stud.find(stu => stu.ID === id);
    setId(id);
    setName(selected.Name);
    setEmail(selected.Email);
    setPhone(selected.phone);
    setUpdate(true);
  };

  return (
    <div className="dashboard p-4">
      {isUpdate ? (
        <form onSubmit={handleUpdate}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      ) : (
        <table className="table">
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
