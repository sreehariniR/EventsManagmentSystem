import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../api/api"
type RegisterData = {
  facultyID: string
  facultyName: string
  email: string
  password: string
}

export default function FacultyRegister(){

const navigate = useNavigate()

const [formData,setFormData] = useState<RegisterData>({
  facultyID:"",
  facultyName:"",
  email:"",
  password:""
})

const [error,setError] = useState("")
const [message,setMessage] = useState("")

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit = async (e:React.FormEvent)=>{
  e.preventDefault()

  setError("")
  setMessage("")

  try{

    const response = await fetch(`${API.faculty}/faculty/`, {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })

    const data = await response.json()

    if(!response.ok){
      throw new Error(data.message || "Registration failed")
    }
    console.log("API:", API.faculty)

    setMessage("Registered successfully")

    setTimeout(()=>{
      navigate("/facultylogin")
    },1000)

  }catch(err:any){
    setError(err.message || "Registration failed")
  }
}

return(

<div
className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
style={{backgroundImage:"url('/fregister.jpeg')"}}
>

<div className="absolute inset-0 bg-black/35"></div>

<div className="relative bg-white w-[370px] p-8 rounded-2xl shadow-2xl">

<h2 className="text-xl font-semibold text-center mb-2">
Create Account
</h2>

<p className="text-xs text-gray-600 text-center mb-5">
Faculty Portal — Register to get started
</p>

<form onSubmit={handleSubmit}>

<input
name="facultyID"
placeholder="Faculty ID"
className="w-full mb-3 p-2.5 border border-gray-300 rounded-md text-sm outline-none"
onChange={handleChange}
/>

<input
name="facultyName"
placeholder="Full Name"
className="w-full mb-3 p-2.5 border border-gray-300 rounded-md text-sm outline-none"
onChange={handleChange}
/>

<input
name="email"
placeholder="Email ID"
className="w-full mb-3 p-2.5 border border-gray-300 rounded-md text-sm outline-none"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full mb-4 p-2.5 border border-gray-300 rounded-md text-sm outline-none"
onChange={handleChange}
/>

<button
type="submit"
className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2.5 rounded-md text-sm font-medium transition"
>
REGISTER
</button>

</form>

{message && (
<p className="text-xs text-center mt-3 text-green-600">
{message}
</p>
)}

{error && (
<p className="text-xs text-center mt-3 text-red-500">
{error}
</p>
)}

<p className="text-xs text-center mt-4 text-gray-600">
Already have an account?{" "}
<Link to="/facultylogin" className="text-yellow-700 font-medium">
Login here
</Link>
</p>

</div>

</div>

)
}