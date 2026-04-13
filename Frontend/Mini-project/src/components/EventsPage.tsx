import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { EventContext } from "../context/EventContext"

export default function EventsPage(){

const { events, facultyID } = useContext(EventContext)
const navigate = useNavigate()

const deleteEvent = async (rollNo:string,eventName:string)=>{

try{

const url = `http://localhost:8082/faculty/${facultyID}/${rollNo}/${eventName}`

const res = await fetch(url,{ method:"DELETE" })

if(!res.ok) throw new Error()

alert("Event Deleted")

}catch{

alert("Delete Failed")

}

}

return(

<div
className="min-h-screen bg-cover bg-center flex"
style={{backgroundImage:"url('/image.png')"}}
>

{/* Sidebar */}

<div className="w-[220px] bg-white/35 backdrop-blur-xl border-r border-white/40 p-6 shadow-lg">

<h2 className="text-xl font-semibold mb-6 text-gray-800">
Actions
</h2>

<button
className="w-full bg-white/40 hover:bg-white/60 p-3 mb-3 rounded-xl transition"
onClick={()=>navigate("/register")}
>
Register Event
</button>
<button
className="w-full bg-white/40 hover:bg-white/60 p-3 mb-3 rounded-xl transition"
onClick={()=>navigate("/viewmonth")}
>
View Events By Month
</button>

<button
className="w-full bg-white/40 hover:bg-white/60 p-3 mb-3 rounded-xl transition"
onClick={()=>navigate("/singlestudent")}
>
View Events By Student
</button>   
</div>

{/* Event Cards */}

<div className="flex-1 p-10 flex flex-col gap-6">

{events.map((e)=>(

<div
key={e.id}
className="bg-white/65 backdrop-blur-xl border border-white/40
shadow-lg rounded-xl p-6 flex justify-between items-center
hover:scale-[1.02] transition"
>

{/* Event Info */}

<div>

<h3 className="text-lg font-semibold mb-2 text-gray-900">
{e.eventName}
</h3>

<p><b>Student:</b> {e.studentName}</p>
<p><b>Roll:</b> {e.rollNo}</p>
<p><b>Date:</b> {e.eventDate}</p>
<p><b>Location:</b> {e.eventLocation}</p>

<p className="text-sm text-gray-700 mt-1">
{e.eventDescription}
</p>

</div>

{/* Actions */}

<div className="flex gap-3">

<button
className="bg-white/50 hover:bg-white/70 px-4 py-2 rounded-lg shadow"
onClick={()=>navigate("/update",{state:e})}
>
Edit
</button>

<button
className="bg-slate-300/70 hover:bg-red-400 px-4 py-2 rounded-lg shadow"
onClick={()=>deleteEvent(e.rollNo,e.eventName)}
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

)
}