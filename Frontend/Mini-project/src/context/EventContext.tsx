import { createContext, useState } from "react"

export type Event = {
  id: string
  studentName: string
  rollNo: string
  eventName: string
  eventDate: string
  eventLocation: string
  eventDescription: string
  facultyID: string
}

type EventContextType = {
  events: Event[]
  setEvents: (events: Event[]) => void
  facultyID: string
  setFacultyID: (id: string) => void
  fetchEvents: () => Promise<void>   
}

export const EventContext = createContext<EventContextType>({
  events: [],
  setEvents: () => {},
  facultyID: "",
  setFacultyID: () => {},
  fetchEvents: async () => {}        // ✅ added
})

export function EventProvider({ children }: { children: React.ReactNode }) {

  const [events, setEvents] = useState<Event[]>([])
  const [facultyID, setFacultyID] = useState("")

  
  const fetchEvents = async () => {
    try {
      if (!facultyID) return   

      const res = await fetch(`http://localhost:8082/faculty/events/${facultyID}`)
      const data = await res.json()

      setEvents(data)

    } catch (err) {
      console.error("Failed to fetch events", err)
    }
  }

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        facultyID,
        setFacultyID,
        fetchEvents  
      }}
    >
      {children}
    </EventContext.Provider>
  )
}