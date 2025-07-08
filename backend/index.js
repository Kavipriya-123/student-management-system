const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stud_crud"
});

// =================== STUDENT API ===================

app.get("/", (req, res) => {
    const query = "SELECT * FROM student";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json("Error");
        return res.json(data);
    });
});

app.post("/create", (req, res) => {
    const query = "INSERT INTO student (name, email) VALUES (?)";
    const values = [req.body.name, req.body.email];
    db.query(query, [values], (err, data) => {
        if (err) return res.status(500).json("Error");
        return res.json(data);
    });
});

app.put("/update/:id", (req, res) => {
    const query = "UPDATE student SET name = ?, email = ? WHERE id = ?";
    const values = [req.body.name, req.body.email];
    db.query(query, [...values, req.params.id], (err, data) => {
        if (err) return res.status(500).json("Error");
        return res.json(data);
    });
});

app.delete("/delete/:id", (req, res) => {
    const query = "DELETE FROM student WHERE id = ?";
    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).json("Error");
        return res.json("Deleted successfully");
    });
});

// =================== AUTH ===================

app.post('/register', (req, res) => {
    const { fullName, age, gender, contact, email, password } = req.body;
    const sql = "INSERT INTO `user-list` (fullname, age, gender, contact, email, password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [fullName, age, gender, contact, email, password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error");
        }
        return res.json("User registered successfully");
    });
});

const JWT_SECRET = "kavikavi";

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM `user-list` WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json("DB error");
        if (result.length === 0) return res.status(401).json("Invalid credentials");

        const user = result[0];
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "12h",
        });

        return res.json({ token });
    });
});

// =================== COURSES API ===================

app.get("/api/courses", (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json("Error fetching courses");
        return res.json(data);
    });
});

app.post("/api/courses", (req, res) => {
    const { name, instructor, duration } = req.body;
    const sql = "INSERT INTO courses (name, instructor, duration) VALUES (?, ?, ?)";
    db.query(sql, [name, instructor, duration], (err, data) => {
        if (err) return res.status(500).json("Error adding course");
        return res.status(201).json("Course added successfully");
    });
});

app.put("/api/courses/:id", (req, res) => {
    const { name, instructor, duration } = req.body;
    const sql = "UPDATE courses SET name = ?, instructor = ?, duration = ? WHERE id = ?";
    db.query(sql, [name, instructor, duration, req.params.id], (err, data) => {
        if (err) return res.status(500).json("Error updating course");
        return res.json("Course updated successfully");
    });
});

app.delete("/api/courses/:id", (req, res) => {
    const sql = "DELETE FROM courses WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json("Error deleting course");
        return res.json("Course deleted successfully");
    });
});

// =================== ONE-TIME TABLE ALTER ===================

app.get("/only-once", (req, res) => {
    const sql1 = "ALTER TABLE courses ADD duration VARCHAR(100)";
    const sql2 = `ALTER TABLE student 
                  ADD course_id INT, 
                  ADD CONSTRAINT fk_course 
                  FOREIGN KEY (course_id) REFERENCES courses(id) 
                  ON DELETE SET NULL 
                  ON UPDATE CASCADE`;

    db.query(sql1, (err1) => {
        if (err1 && err1.code !== 'ER_DUP_FIELDNAME') {
            console.error("Error adding duration:", err1);
            return res.status(500).json("Error altering courses table");
        }

        db.query(sql2, (err2) => {
            if (err2 && err2.code !== 'ER_DUP_FIELDNAME') {
                console.error("Error adding foreign key:", err2);
                return res.status(500).json("Error altering student table");
            }

            return res.json("Tables updated successfully");
        });
    });
});

app.put("/assign-course/:studentId", (req, res) => {
  const { courseId } = req.body;
  const sql = "UPDATE student SET course_id = ? WHERE id = ?";
  db.query(sql, [courseId, req.params.studentId], (err, data) => {
    if (err) return res.status(500).json("Error assigning course");
    return res.json("Course assigned successfully");
  });
});

app.get("/students-with-courses", (req, res) => {
  const sql = `
    SELECT student.id, student.name, student.email, courses.name AS course_name, student.course_id
    FROM student
    LEFT JOIN courses ON student.course_id = courses.id
  `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json("Error fetching student-course data");
    return res.json(data);
  });
});


// =================== SERVER START ===================

app.listen(5000, () => {
    console.log("server is running in 5000 port");
});

module.exports = app;
