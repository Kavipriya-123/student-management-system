import "./index.css";

const About = () => {
  return (
    <div className="p-4 w-100 about-cont">
      <h2 className="mb-3">About Student-Course Management System</h2>
      <p>
        This Student-Course Management System is a web-based platform designed to manage student records and assign them to courses efficiently.
        Admins can create, update, and delete student and course data, and also assign each student to a course.
      </p>

      <h4 className="mt-4">Key Features:</h4>
      <ul>
        <li>🧑‍🎓 Add, update, and delete student details</li>
        <li>📚 Create and manage courses with duration</li>
        <li>🔗 Assign a course to each student</li>
        <li>📋 View combined student-course assignments</li>
        <li>🔒 User registration and login</li>
      </ul>

      <h4 className="mt-4">Tech Stack:</h4>
      <ul>
        <li>💻 Frontend: React JS</li>
        <li>⚙️ Backend: Node.js + Express</li>
        <li>🗄️ Database: MySQL (XAMPP)</li>
      </ul>

      <h4 className="mt-4">Developed By:</h4>
      <p>
        👩‍💻 <strong>Kavipriya K</strong><br />
        Department of Full stack development<br />
        Velankani Information System private Limited
      </p>
    </div>
  );
};

export default About;
