import { useNavigate } from "react-router-dom";


export default function RoleSelection() {
 const navigate = useNavigate();


 return (
   <div
     className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-6"
     style={{ backgroundImage: "url('leaves.png')" }}
   >
     <div className="absolute inset-0 bg-black/35"></div>


     <div className="relative flex flex-col md:flex-row gap-8">
       <div className="bg-white w-[320px] p-8 rounded-2xl shadow-xl text-center">
         <h2 className="text-xl font-semibold mb-3 text-gray-900">Student</h2>
         <p className="text-sm text-gray-600 mb-5">
           Access student registration, login, and event details.
         </p>
         <button
           onClick={() => navigate("/student")}
           className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md text-sm font-medium"
         >
           Continue as Student
         </button>
       </div>


       <div className="bg-white w-[320px] p-8 rounded-2xl shadow-xl text-center">
         <h2 className="text-xl font-semibold mb-3 text-gray-900">Faculty</h2>
         <p className="text-sm text-gray-600 mb-5">
           Register, login, and manage student event participation.
         </p>


         <button
           onClick={() => navigate("/facultyregister")}
           className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md text-sm font-medium mb-3"
         >
           Faculty Register
         </button>


         <button
           onClick={() => navigate("/facultylogin")}
           className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md text-sm font-medium"
         >
           Faculty Login
         </button>
       </div>
     </div>
   </div>
 );
}

