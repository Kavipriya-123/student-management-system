const express=require("express");
const cors=require("cors");
const mysql=require("mysql");
const jwt=require("jsonwebtoken");

const app=express();
app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"stud_crud"
});

app.get("/",(req,res)=>{
    const que="select * from student";
    db.query(que,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/create",(req,res)=>{
    const que="insert into student (name,email) values(?)"
    const values=[req.body.name,req.body.email];
    db.query(que,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id",(req,res)=>{
    const que="update student set name=?, email=? where id=?"
    const values=[req.body.name,req.body.email];
    const id=req.params.id;
    db.query(que,[...values,id],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/delete/:id",(req,res)=>{
    const que="delete from student where id=?"
    const id=req.params.id;
    db.query(que,[id],(err,data)=>{
        if(err)return res.json("Error");
        return res.json("Deleted successfully");
    })
})

app.post('/register', (req, res) => {
  const { fullName, age, gender, contact, email, password } = req.body;
  const sql = "INSERT INTO `user-list` (fullname, age, gender, contact, email, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [fullName, age, gender, contact, email, password], (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
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


app.listen(5000,()=>{
    console.log("server is running in 5000 port");
})

module.exports=app;