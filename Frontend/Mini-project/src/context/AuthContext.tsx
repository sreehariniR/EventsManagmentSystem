import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface AuthContextType {
  studentRollNo: string | null
  setStudentRollNo: (roll: string | null) => void
}

const AuthContext = createContext<AuthContextType>({
  studentRollNo: null,
  setStudentRollNo: () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {

const [studentRollNo,setStudentRollNoState] = useState<string | null>(
localStorage.getItem("studentRollNo")
)

const setStudentRollNo = (roll:string | null) => {

if(roll){
localStorage.setItem("studentRollNo",roll)
}else{
localStorage.removeItem("studentRollNo")
}

setStudentRollNoState(roll)

}

return(

<AuthContext.Provider value={{studentRollNo,setStudentRollNo}}>
{children}
</AuthContext.Provider>

)

}

export const useAuth = ()=>useContext(AuthContext)