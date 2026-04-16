import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EventContext } from "../context/EventContext"

export default function EventsPage() {

  const { events, facultyID, fetchEvents } = useContext(EventContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchEvents()
  }, [facultyID])

  const deleteEvent = async (rollNo: string, eventName: string) => {
    try {
      const res = await fetch(
        `http://localhost:8082/faculty/${facultyID}/${rollNo}/${eventName}`,
        { method: "DELETE" }
      )

      if (!res.ok) throw new Error()

      await fetchEvents()

    } catch {
      alert("Delete Failed")
    }
  }

  return (
    <div className="relative min-h-screen">

      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/image.png')" }}
      ></div>

      <div className="relative flex">

        <div className="fixed top-0 left-0 h-screen w-[220px] bg-white/35 backdrop-blur-xl border-r border-white/40 p-6 shadow-lg z-10">

          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Actions
          </h2>

          <button
            className="w-full bg-white/40 hover:bg-white/60 p-3 mb-3 rounded-xl"
            onClick={() => navigate("/register")}
          >
            Register Event
          </button>

          <button
            className="w-full bg-white/40 hover:bg-white/60 p-3 mb-3 rounded-xl"
            onClick={() => navigate("/viewmonth")}
          >
            View Events By Month
          </button>

          <button
            className="w-full bg-white/40 hover:bg-white/60 p-3 mb-3 rounded-xl"
            onClick={() => navigate("/singlestudent")}
          >
            View Events By Student
          </button>

        </div>

        <div className="ml-[220px] w-full p-10 flex flex-col gap-6">

          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white/65 backdrop-blur-xl border border-white/40
              shadow-lg rounded-xl p-6 flex justify-between items-center hover:scale-102 transition"
            >

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {e.eventName}
                </h3>

                <p><b>Student:</b> {e.studentName}</p>
                <p><b>Roll:</b> {e.rollNo}</p>
                <p><b>Date:</b> {e.eventDate}</p>
                <p><b>Location:</b> {e.eventLocation}</p>

                <p className="text-sm mt-1">
                  {e.eventDescription}
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  className="bg-white/50 px-4 py-2 rounded-lg hover:bg-blue-400/50"
                  onClick={() => navigate("/update", { state: e })}
                >
                  Edit
                </button>

                <button
                  className="bg-slate-300/70 px-4 py-2 rounded-lg hover:bg-red-600/50"
                  onClick={() => deleteEvent(e.rollNo, e.eventName)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}