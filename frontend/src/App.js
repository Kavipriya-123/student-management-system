import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home"; // This now handles nested routes
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import StudentCourse from "./components/StudentCourse";
import About from "./components/About";
import Studentss from "./components/Studentss";

import { AllEnterpriseModule, ModuleRegistry } from "ag-grid-enterprise";
ModuleRegistry.registerModules([AllEnterpriseModule]);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes under /home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {/* Nested tab routes */}
          <Route index element={<Dashboard changeTab={() => {}} />} />
          <Route path="Dashboard" element={<Dashboard changeTab={() => {}} />} />
          <Route path="Students" element={<Studentss changeTab={() => {}} />} />
          <Route path="Courses" element={<Courses changeTab={() => {}} />} />
          <Route path="StudentCourse" element={<StudentCourse changeTab={() => {}} />} />
          <Route path="About" element={<About changeTab={() => {}} />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<div className="text-danger p-3">⚠️ Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
