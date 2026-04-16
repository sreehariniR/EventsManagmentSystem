import { useState, useContext } from "react"
import { Link,useNavigate } from "react-router-dom"
import { EventContext } from "../context/EventContext"
import API from "../api/api"

type LoginData = {
  email: string
  password: string
}

export default function FacultyLogin(){

const navigate = useNavigate()
const { setEvents, setFacultyID } = useContext(EventContext)

const [login,setLogin] = useState<LoginData>({
  email:"",
  password:""
})

const [error,setError] = useState("")

const loginForm = async (e:React.FormEvent)=>{
e.preventDefault()
setError("")

try{
console.log(`${API.faculty}/facultylogin/`)
const res = await fetch(`${API.faculty}/facultylogin/`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(login)
})

if(!res.ok) throw new Error()

const events = await res.json()

setEvents(events)

if(events.length>0){
setFacultyID(events[0].facultyID)
}

navigate("/events")

}catch{

setError("Invalid email or password")

}

}

return(

<div
className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
style={{backgroundImage:"url('/fregister.jpeg')"}}
>

{/* dark overlay */}
<div className="absolute inset-0 bg-black/35"></div>

<div className="relative bg-white w-[370px] p-8 rounded-2xl shadow-2xl">

<h2 className="text-xl font-semibold text-center mb-2 text-black">
Welcome Back
</h2>

<p className="text-xs text-gray-600 text-center mb-5">
Faculty Portal — Sign in to continue
</p>

<form onSubmit={loginForm}>

<input
placeholder="Email"
className="w-full mb-3 p-2.5 border border-gray-300 rounded-md text-sm text-black outline-none"
onChange={(e)=>setLogin({...login,email:e.target.value})}
/>

<input
type="password"
placeholder="Password"
className="w-full mb-4 p-2.5 border border-gray-300 rounded-md text-sm text-black outline-none"
onChange={(e)=>setLogin({...login,password:e.target.value})}
/>

<button
className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 rounded-md text-sm font-medium transition"
>
SIGN IN
</button>

</form>

{error && (
<p className="text-xs text-center mt-3 text-red-500">{error}</p>
)}

<p className="text-xs text-center mt-4 text-gray-600">
Don’t have an account?{" "}
<Link to="/facultyregister" className="text-yellow-700 font-medium">
Register here
</Link>
</p>

</div>

</div>

)
}