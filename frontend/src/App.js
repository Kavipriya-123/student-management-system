
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Student from "./Student"
import CreateStudent from "./CreateStudent"
import UpdateStudent from "./UpdateStudent";

const App=()=>{
  return(<BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Student/>}/>
      <Route exact path="/create" element={<CreateStudent/>}/>
      <Route exact path="/update/:id" element={<UpdateStudent/>}/>
    </Routes>
  </BrowserRouter>)
}

export default App;