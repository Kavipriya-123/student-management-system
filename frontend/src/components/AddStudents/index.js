import "./index.css"
import axios from "axios";
import { useState} from "react";

const AddStudents=()=>{
    const[name,setName]=useState('');
    const[email,setEmail]=useState('')

    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post("http://localhost:5000/create",{name,email})
        .then(res=>{
            console.log(res);
            setName("");
            setEmail("");
        }).catch(err=>console.log(err));
    }
    return(<div className="add-student-cont">
        <form onSubmit={handleSubmit}>
                <h2>Add student</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input value={name} type="text" placeholder="Enter Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter Email" className="form-control"/>
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
    </div>)
}

export default AddStudents;