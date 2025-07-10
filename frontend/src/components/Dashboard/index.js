import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Optional: for your custom styles

const Dashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const gridRef = useRef(null);

  // 👇 Column Definitions
  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    {
      headerName: "Course Assigned",
      field: "course_name",
      cellRenderer: (params) =>
        params.value ? params.value : "Not Assigned",
    },
  ];

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
  };

  // 🔄 Fetch student-course data
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students-with-courses");
      setStudentData(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 🔍 Quick Filter (search)
  const handleQuickFilter = (e) => {
    const value = e.target.value;
    if (
      gridRef.current &&
      gridRef.current.api &&
      typeof gridRef.current.api.setQuickFilter === "function"
    ) {
      gridRef.current.api.setQuickFilter(value);
    } else {
      console.warn("Grid API is not ready yet.");
    }
  };

  // 📤 Export to CSV
  const handleExport = () => {
    if (
      gridRef.current &&
      gridRef.current.api &&
      typeof gridRef.current.api.exportDataAsCsv === "function"
    ) {
      gridRef.current.api.exportDataAsCsv();
    } else {
      console.warn("Export function not available.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📊 Student-Course Dashboard</h2>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            style={{ width: "250px" }}
            placeholder="Search students..."
            onChange={handleQuickFilter}
          />
          <button className="btn btn-success" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading dashboard data...</p>
        </div>
      ) : (
        <div
          className="ag-theme-alpine"
          style={{ height: "500px", width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={studentData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            animateRows={true}
            rowSelection="single"
            getRowStyle={(params) =>
              params.node.rowIndex % 2 === 0
                ? { background: "#f8f9fa" }
                : {}
            }
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
