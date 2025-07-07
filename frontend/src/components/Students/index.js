import "./index.css";
import axios from "axios";
import { useState,useEffect } from "react";

const Students = () => {
    const[stud,setStud]=useState([]);
    const[isUpdate,setUpdate]=useState(false);
    const[id,setId]=useState(null);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('')

    const getData=()=>{
        axios.get("http://localhost:5000/")
        .then(res=>setStud(res.data))
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        getData();
    },[]);


 const handleUpdate=(event)=>{
        event.preventDefault()
        axios.put("http://localhost:5000/update/"+id,{name,email})
        .then(res=>{
            console.log(res);
            setUpdate(false)
            getData();
        }).catch(err=>console.log(err));
    }

    const setUpdateStatus=(id)=>{
        setId(id);
        setUpdate(true);
    }
       
    
  return (
    <div className="dashboard p-4">
        {isUpdate?<form onSubmit={handleUpdate}>
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
            </form>:
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
                                    <button onClick={()=>setUpdateStatus(data.ID)} className="btn btn-primary">Update</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>}
    </div>
  );
};

export default Students;
