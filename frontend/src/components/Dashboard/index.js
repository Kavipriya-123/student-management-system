import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./index.css";

const Dashboard = ({ changeTab }) => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("table");
  const gridRef = useRef(null);
  const [totalCourses, setTotalCourses] = useState(0);

      const fetchDashboardData = async () => {
        try {
          const [studentsRes, coursesRes] = await Promise.all([
            axios.get("http://localhost:5000/students-with-courses"),
            axios.get("http://localhost:5000/api/courses")
          ]);
          setStudentData(studentsRes.data);
          setTotalCourses(coursesRes.data.length);
        } catch (err) {
          console.error(err);
          setError("❌ Failed to fetch dashboard data.");
        } finally {
          setLoading(false);
        }
      };


  const columnDefs = [
    { headerName: "ID", field: "id", checkboxSelection: true },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email" },
    {
      headerName: "Course Assigned",
      field: "course_name",
      cellRenderer: (params) => params.value || "Not Assigned",
    },
  ];

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  };

 

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickFilter = (e) => {
    const value = e.target.value;
    gridRef.current?.api?.setQuickFilter(value);
  };

  const handleExport = () => {
    gridRef.current?.api?.exportDataAsCsv();
  };

  const total = studentData.length;
  const assigned = studentData.filter((s) => s.course_name).length;
  const unassigned = total - assigned;

  const pieData = [
    { name: "Assigned", value: assigned },
    { name: "Unassigned", value: unassigned },
  ];

  const COLORS = ["#28a745", "#ffc107"];

  return (
    <div className="cont1 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center">
          <i
            className="bi bi-house-fill text-secondary fs-4 me-2"
            role="button"
            title="Home"
            onClick={() => changeTab("Dashboard")}
          ></i>
          <h2 className="m-0 fw-bold text-primary">Student-Course Dashboard</h2>
        </div>

        <div className="d-flex flex-wrap mt-3 mt-md-0">
          <input
            type="text"
            className="form-control me-2 mb-2 mb-md-0"
            style={{ width: "250px" }}
            placeholder="Search students..."
            onChange={handleQuickFilter}
          />
          <button className="btn btn-success" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card stat-card border-start border-primary border-4 shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Students</h6>
              <h2 className="fw-bold text-primary">{total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card border-start border-success border-4 shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">Assigned</h6>
              <h2 className="fw-bold text-success">{assigned}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card border-start border-warning border-4 shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">Unassigned</h6>
              <h2 className="fw-bold text-warning">{unassigned}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card stat-card border-start border-info border-4 shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Courses</h6>
              <h2 className="fw-bold text-info">{totalCourses}</h2>
            </div>
          </div>
        </div>
      </div>


      {/* Tabs for Table and Analytics */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        <Tab eventKey="table" title="Table View">
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
                rowSelection="multiple"
                getRowStyle={(params) =>
                  params.node.rowIndex % 2 === 0
                    ? { background: "#f8f9fa" }
                    : {}
                }
              />
            </div>
          )}
        </Tab>

        <Tab eventKey="analytics" title="Analytics View">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="text-center">Course Assignment Distribution</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
