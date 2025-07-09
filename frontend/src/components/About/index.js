import "./index.css";

const About = () => {
  return (
    <div className="about-wrapper container p-4">
      <div className="about-box p-4 shadow-sm rounded">
        <h2 className="mb-4 text-primary">📘 About Student-Course Management System</h2>

        <p className="mb-4">
          This Student-Course Management System is a web-based platform designed to manage student records and assign them to courses efficiently.
          Admins can create, update, and delete student and course data, and also assign each student to a course.
        </p>

        <h4 className="mt-4 text-secondary">Key Features:</h4>
        <ul className="styled-list">
          <li> Add, update, and delete student details</li>
          <li>Create and manage courses with duration</li>
          <li> Assign a course to each student</li>
          <li> View combined student-course assignments</li>
          <li> User registration and login</li>
        </ul>

        <h4 className="mt-4 text-secondary">Tech Stack:</h4>
        <ul className="styled-list">
          <li>Frontend: React JS</li>
          <li> Backend: Node.js + Express</li>
          <li> Database: MySQL (XAMPP)</li>
        </ul>

        <h4 className="mt-4 text-secondary">Developed By:</h4>
        <ul className="styled-list">
          <li><strong>Kavipriya K</strong></li>
          <li>Department of Full Stack Development</li>
          <li>Velankani Information System Private Limited</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
