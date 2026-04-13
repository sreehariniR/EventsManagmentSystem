import { createContext, useState } from "react"

export type Event ={
    id:string
    studentName:string
    rollNo:string
    eventName:string
    eventDate:string
    eventLocation:string
    eventDescription:string
    facultyID:string
}

type EventContextType ={
    events:Event[]
    setEvents:(events:Event[])=>void
    facultyID:string
    setFacultyID:(id:string)=>void
}

export const EventContext = createContext<EventContextType>({
    events:[],
    setEvents:()=>{},
    facultyID:"",
    setFacultyID:()=>{}
})

export function EventProvider({children}:{children:React.ReactNode}){

    const [events,setEvents] = useState<Event[]>([])
    const [facultyID,setFacultyID] = useState("")

    return(
        <EventContext.Provider value={{events,setEvents,facultyID,setFacultyID}}>
            {children}
        </EventContext.Provider>
    )
}