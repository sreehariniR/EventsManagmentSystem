import { useState, useContext } from "react"
import { useLocation } from "react-router-dom"
import { EventContext } from "../context/EventContext"

export default function UpdateEvent(){

const { facultyID } = useContext(EventContext)
const location = useLocation()

const eventData = location.state

const [event,setEvent] = useState({
studentName: eventData?.studentName || "",
rollNo: eventData?.rollNo || "",
eventName: eventData?.eventName || "",
eventDate: eventData?.eventDate || "",
eventLocation: eventData?.eventLocation || "",
eventDescription: eventData?.eventDescription || ""
})

const updateEvent = async ()=>{

try{

const res = await fetch(
`http://localhost:8082/faculty/${facultyID}/${event.rollNo}/${event.eventName}`,
{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({...event,facultyID})
}
)

if(!res.ok) throw new Error()

alert("Event Updated")

}catch{

alert("Update Failed")

}

}

return(

<div
className="min-h-screen flex items-center justify-center bg-cover bg-center"
style={{backgroundImage:"url('/falls.png')"}}
>

<div className="bg-white/25 backdrop-blur-xl border border-white/40 p-10 rounded-xl w-[520px] shadow-lg">

<h2 className="text-xl font-bold mb-6 text-center">
Update Event
</h2>

<input
className="input"
value={event.studentName}
onChange={(e)=>setEvent({...event,studentName:e.target.value})}
/>

<input
className="input"
value={event.rollNo}
onChange={(e)=>setEvent({...event,rollNo:e.target.value})}
/>

<input
className="input"
value={event.eventName}
onChange={(e)=>setEvent({...event,eventName:e.target.value})}
/>

<input
type="date"
className="input"
value={event.eventDate}
onChange={(e)=>setEvent({...event,eventDate:e.target.value})}
/>

<input
className="input"
value={event.eventLocation}
onChange={(e)=>setEvent({...event,eventLocation:e.target.value})}
/>

<textarea
className="input"
value={event.eventDescription}
onChange={(e)=>setEvent({...event,eventDescription:e.target.value})}
/>

<button
className="bg-slate-300 hover:bg-green-600 w-full p-3 mt-4 rounded-xl"
onClick={updateEvent}
>
Update Event
</button>

</div>

</div>

)
}