import { useState, useContext } from "react"
import { EventContext } from "../context/EventContext"
import API from "../api/api"
export default function RegisterEvent(){

const { facultyID } = useContext(EventContext)

const [event,setEvent] = useState({
studentName:"",
rollNo:"",
eventName:"",
eventDate:"",
eventLocation:"",
eventDescription:""
})

const register = async ()=>{

const payload = {
...event,
facultyID: facultyID
}

await fetch(`${API.faculty}/faculty/events`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(payload)
})

alert("Event Registered")

}

return(

<div
className="min-h-screen flex items-center justify-center bg-cover bg-center"
style={{backgroundImage:"url('/sea.jpg')"}}
>

<div className="bg-white/80 backdrop-blur-lg p-10 rounded-xl w-[500px] shadow-xl">

<h2 className="text-xl mb-6 text-center font-bold">
Register Event
</h2>

<input
className="input"
placeholder="Student Name"
onChange={(e)=>setEvent({...event,studentName:e.target.value})}
/>

<input
className="input"
placeholder="Roll No"
onChange={(e)=>setEvent({...event,rollNo:e.target.value})}
/>

<input
className="input"
placeholder="Event Name"
onChange={(e)=>setEvent({...event,eventName:e.target.value})}
/>

<input
type="date"
className="input"
onChange={(e)=>{
const date = e.target.value

const d = new Date(date)

const month = String(d.getMonth()+1).padStart(2,"0")
const year = d.getFullYear()

setEvent({...event,eventDate:`${month}-${year}`})
}}
/>

<input
className="input"
placeholder="Location"
onChange={(e)=>setEvent({...event,eventLocation:e.target.value})}
/>

<textarea
className="input"
placeholder="Description"
onChange={(e)=>setEvent({...event,eventDescription:e.target.value})}
/>

<button
className="bg-blue-200 w-full p-3 mt-4 rounded-xl"
onClick={register}
>
Submit
</button>

</div>

</div>

)

}