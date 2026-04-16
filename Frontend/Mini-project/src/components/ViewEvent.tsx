import { useState, useContext } from "react"
import { EventContext } from "../context/EventContext"

export default function ViewMonth(){

  const { facultyID } = useContext(EventContext)

  const [month, setMonth] = useState("")
  const [events, setEvents] = useState<any[]>([])  // ✅ FIXED

  const fetchEvents = async () => {

    try {

      const res = await fetch(
        `http://localhost:8082/faculty/eventsbymonth/${month}/${facultyID}`
      )

      if(!res.ok) throw new Error()

      const data = await res.json()
      setEvents(data)

    } catch {
      alert("Failed to fetch events")
    }

  }

  return(

    <div
      className="min-h-screen inset-0 bg-cover bg-center bg-fixed flex flex-col items-center p-10"
      style={{backgroundImage:"url('/falls.png')"}}
    >

      <div className="bg-white/35 backdrop-blur-xl border border-white/40 p-6 rounded-xl shadow-lg w-[500px]">

        <h2 className="text-xl font-semibold mb-4 text-center">
          View Events By Month
        </h2>

        <input
          type="month"
          className="w-full p-3 rounded-lg mb-3 bg-white/60"
          value={month}
          onChange={(e)=>setMonth(e.target.value)}
        />

        <button
          className="w-full bg-white/50 hover:bg-white/70 p-3 rounded-lg"
          onClick={fetchEvents}
        >
          Search
        </button>

      </div>

      {/* Event Cards */}

      <div className="flex flex-col gap-6 mt-10 w-[700px]">

        {events.map((e,i)=>(

          <div
            key={i}
            className="bg-white/65 backdrop-blur-xl border border-white/40
            shadow-lg rounded-xl p-6"
          >

            <h3 className="text-lg font-semibold mb-2">
              {e.eventName}
            </h3>

            <p><b>Student:</b> {e.studentName}</p>
            <p><b>Roll:</b> {e.rollNo}</p>
            <p><b>Date:</b> {e.eventDate}</p>
            <p><b>Location:</b> {e.eventLocation}</p>

            <p className="text-sm mt-2">
              {e.eventDescription}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}