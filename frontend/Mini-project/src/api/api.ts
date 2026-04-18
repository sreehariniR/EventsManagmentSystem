type APIType = {
  event: string
  faculty: string
  student: string
}

const API: APIType = {
  event: import.meta.env.VITE_EVENT_API as string,
  faculty: import.meta.env.VITE_FACULTY_API as string,
  student: import.meta.env.VITE_STUDENT_API as string
}

export default API