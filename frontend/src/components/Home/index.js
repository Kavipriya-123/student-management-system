import "./index.css"
import { useState } from "react"

import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

import Dashboard from "../Dashboard"
import Students from "../Students"
import AddStudents from "../AddStudents"

const Home=()=>{
    const [activeTab,setActiveTab]=useState("Dashboard")
    const updatePage=()=>{
        switch(activeTab){
            case "Dashboard": return <Dashboard/>
            case "Students": return <Students/>
            case "AddStudent" :return <AddStudents/>
            default : return null;
        }
    }

    const changeTab=(tabName)=>{
        setActiveTab(tabName);
    }
    
    return(<div>
        <Navbar/>
        <div className="d-flex">
            <Sidebar changeTab={changeTab} activeTab={activeTab}/>
            {updatePage()}
        </div>
    </div>)
}

export default Home;