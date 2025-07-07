import React,{useEffect,useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

const Student=()=>{
    const[stud,setStud]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/")
        .then(res=>setStud(res.data))
        .catch(err=>console.log(err));
    },[]);


    const handleDelete=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/delete/${id}`);
            window.location.reload();
        }catch(e){
            console.log(e);
        }
        
       
    }

    return(<div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <Link to="/create" className="btn btn-success">Add +</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stud.map((data,i)=>{
                            return(<tr key={i}>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>
                                    <Link to={`/update/${data.ID}`} className="btn btn-primary">Update</Link>
                                    <button onClick={e=>handleDelete(data.ID)} className="btn btn-danger ms-2">Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default Student;