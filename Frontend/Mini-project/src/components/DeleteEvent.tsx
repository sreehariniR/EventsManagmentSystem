import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { EventContext } from "../context/EventContext"

export default function DeleteEvent() {

  const { facultyID, fetchEvents } = useContext(EventContext)
  const navigate = useNavigate()

  const [rollNo, setRollNo] = useState("")
  const [eventName, setEventName] = useState("")

  const deleteEvent = async () => {
    try {
      const res = await fetch(
        `http://localhost:8082/faculty/${facultyID}/${rollNo}/${eventName}`,
        { method: "DELETE" }
      )

      if (!res.ok) throw new Error()

      await fetchEvents()     
      navigate("/events")     

    } catch {
      alert("Delete Failed")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/leaves.png')" }}
    >
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-xl shadow-xl w-[420px]">

        <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
          Delete Event
        </h2>

        <input
          placeholder="Roll Number"
          className="w-full p-3 mb-4 rounded-xl border"
          onChange={(e) => setRollNo(e.target.value)}
        />

        <input
          placeholder="Event Name"
          className="w-full p-3 mb-6 rounded-xl border"
          onChange={(e) => setEventName(e.target.value)}
        />

        <button
          className="w-full bg-slate-200 hover:bg-green-700 p-3 rounded-xl transition"
          onClick={deleteEvent}
        >
          Delete Event
        </button>

      </div>
    </div>
  )
}