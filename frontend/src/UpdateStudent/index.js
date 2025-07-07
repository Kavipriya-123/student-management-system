
import { useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

const UpdateStudent=()=>{
    const[name,setName]=useState('');
    const[email,setEmail]=useState('')
    const navigate=useNavigate();
    const {id}=useParams();

    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.put("http://localhost:5000/update/"+id,{name,email})
        .then(res=>{
            console.log(res);
            navigate("/");
        }).catch(err=>console.log(err));
    }

    return(<div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                <h2>Update student</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter Email" className="form-control"/>
                </div>
                <button className="btn btn-success">Update</button>
            </form>
        </div>
    </div>)
}

export default UpdateStudent;