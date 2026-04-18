import { useLocation, useNavigate } from "react-router-dom"

export default function StudentEvents(){

const location = useLocation()
const navigate = useNavigate()

const events = location.state || []
const email= localStorage.getItem("studentEmail") || "123"

return(

<div
className="min-h-screen bg-cover bg-center relative text-white"
style={{backgroundImage:"url('/events.jpeg')"}}
>

{/* dark overlay */}
<div className="absolute inset-0 bg-black/60"></div>

<div className="relative z-10 px-12 py-8">

{/* Top bar */}

<div className="flex justify-between items-center mb-10">

<div className="flex items-center gap-4">
<h1 className="font-bold text-lg">My Events</h1>
<span className="text-xs tracking-widest text-gray-300">STUDENT PORTAL</span>
</div>

<div className="flex items-center gap-3">

<div className="bg-white/20 px-4 py-1 rounded-full text-sm">
Email. {email}
</div>

<button
className="border border-white/40 px-4 py-1 rounded hover:bg-white/20"
onClick={()=>{
localStorage.removeItem("studentEmail")
navigate("/student")
}}
>
Logout
</button>

</div>

</div>

{/* Heading */}

<div className="mb-8">

<p className="text-xs tracking-widest text-gray-300">
SSN COLLEGE OF ENGINEERING
</p>

<h2 className="text-3xl font-bold mt-2">
Event Participation
</h2>

<p className="text-gray-300 text-sm mt-1">
All events you've been registered for by your faculty
</p>

</div>

{/* Events count */}

<div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 mb-10 w-full">

<h3 className="text-2xl font-semibold">
{events.length}
</h3>

<p className="text-sm text-gray-200">
Events registered
</p>

</div>

{/* Event cards */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

{events.map((e:any)=>(

<div
key={e.id}
className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-[1.02] transition"
>

<h3 className="text-lg font-semibold mb-3">
{e.eventName}
</h3>

<p className="text-sm text-gray-200">
Student: {e.studentName}
</p>

<p className="text-sm text-gray-200">
Roll No: {e.rollNo}
</p>

<p className="text-sm text-gray-200">
Location: {e.eventLocation}
</p>

<p className="text-sm text-gray-200">
Date: {e.eventDate}
</p>

<p className="text-sm text-gray-200">
Faculty ID: {e.facultyID}
</p>

<hr className="border-white/30 my-3"/>

<p className="text-sm text-gray-100">
{e.eventDescription}
</p>

</div>

))}

</div>

</div>

</div>

)
}