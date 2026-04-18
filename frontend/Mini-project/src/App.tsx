import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./components/Login"
import EventsPage from "./components/EventsPage"
import RegisterEvent from "./components/RegisterEvent"
import UpdateEvent from "./components/UpdateEvent"
import DeleteEvent from "./components/DeleteEvent"
import SingleStudentView from "./components/SingleStudentEvent"
import ViewMonth from "./components/ViewEvent"
import { EventProvider } from "./context/EventContext"
import FacultyRegister from "./components/FacultyRegister"
import RoleSelection from "./components/RoleSelection"
import StudentLogin from "./components/StudentLogin"
import StudentRegister from "./components/StudentRegister"
import StudentEvents from "./components/StudentEvents"
function App(){

return(

<EventProvider>

<BrowserRouter>

<Routes>
<Route path="/" element={<RoleSelection/>}/>
<Route path="/facultylogin" element={<Login/>}/>
<Route path="/events" element={<EventsPage/>}/>
<Route path="/facultyregister" element={<FacultyRegister/>}/>
<Route path="/register" element={<RegisterEvent/>}/>
<Route path="/update" element={<UpdateEvent/>}/>
<Route path="/delete" element={<DeleteEvent/>}/>
<Route path="/viewmonth" element={<ViewMonth/>}/>
<Route path="/singlestudent" element={<SingleStudentView/>}/>
<Route path="/student" element={<StudentLogin/>}/>
<Route path="/studentregister" element={<StudentRegister/>}/>
<Route path="/studentevents" element={<StudentEvents/>}/>
</Routes>

</BrowserRouter>

</EventProvider>

)

}

export default App