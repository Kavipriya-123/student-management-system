import "./index.css";
import axios from "axios";
import { useState,useEffect } from "react";

const Dashboard = () => {
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
  return (
    <div className="dashboard p-4">
      <table className="table">
                <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stud.map((data,i)=>{
                            return(<tr key={i}>
                                <td>{data.ID}</td>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>
                                    <button onClick={e=>handleDelete(data.ID)} className="btn btn-danger ms-2">Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
    </div>
  );
};

export default Dashboard;
