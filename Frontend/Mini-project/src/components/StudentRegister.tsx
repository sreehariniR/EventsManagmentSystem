import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentRegister() {

const navigate = useNavigate()

const [form,setForm] = useState({
rollNo:"",
studentName:"",
email:"",
password:""
})

const [msg,setMsg] = useState<{text:string,ok:boolean}|null>(null)
const [loading,setLoading] = useState(false)
const [focused,setFocused] = useState<string|null>(null)

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async (e:React.FormEvent)=>{

e.preventDefault()
setLoading(true)
setMsg(null)

try{

const res = await fetch("http://localhost:8081/api/student_register/",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(form)
})

if(!res.ok) throw new Error()

setMsg({text:"Registration successful! Redirecting…",ok:true})

setTimeout(()=>navigate("/student"),1200)

}catch{

setMsg({text:"Registration failed. Please try again.",ok:false})

}finally{

setLoading(false)

}

}

const fields=[
{label:"Roll Number",name:"rollNo",type:"text",placeholder:"e.g. 108"},
{label:"Full Name",name:"studentName",type:"text",placeholder:"Your full name"},
{label:"Email",name:"email",type:"email",placeholder:"student@gmail.com"},
{label:"Password",name:"password",type:"password",placeholder:"Create a password"}
]

return(

<div
className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
style={{backgroundImage:`url('fregister.jpeg')`}}
>

<div className="absolute inset-0" style={{background:"rgba(8,8,8,0.55)"}} />

<div
className="absolute inset-0 pointer-events-none"
style={{
background:"radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)"
}}
/>

<div className="relative z-10 w-full max-w-[420px] px-4 py-8">

{/* SSN Badge */}
<div className="flex flex-col items-center mb-6">

<div
className="px-4 py-1 rounded-full mb-4"
style={{
border:"1px solid rgba(201,168,76,0.35)",
background:"rgba(201,168,76,0.08)"
}}
>

<span
style={{
fontFamily:"DM Sans",
fontSize:"10px",
letterSpacing:"3px",
color:"#C9A84C",
textTransform:"uppercase"
}}
>
SSN College of Engineering
</span>

</div>

</div>

{/* Card */}

<div
style={{
background:"rgba(255,255,255,0.97)",
borderRadius:"16px",
boxShadow:"0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,168,76,0.15)",
overflow:"hidden"
}}
>

<div style={{
height:"3px",
background:"linear-gradient(90deg,#C9A84C,#e8c77a,#C9A84C)"
}}/>

<div className="px-8 py-8">

<div className="mb-7">

<h1
style={{
fontFamily:"Playfair Display",
fontSize:"26px",
fontWeight:700,
color:"#111",
marginBottom:"4px"
}}
>
Create Account
</h1>

<p
style={{
fontFamily:"DM Sans",
fontSize:"13px",
color:"#888"
}}
>
Student Portal — Register to get started
</p>

</div>

<form
onSubmit={handleSubmit}
style={{display:"flex",flexDirection:"column",gap:"18px"}}
>

{fields.map((field)=>(
<div key={field.name}>

<label
style={{
fontFamily:"DM Sans",
fontSize:"11px",
fontWeight:600,
letterSpacing:"1.5px",
textTransform:"uppercase",
color:focused===field.name?"#C9A84C":"#555",
display:"block",
marginBottom:"7px"
}}
>
{field.label}
</label>

<input
name={field.name}
type={field.type}
placeholder={field.placeholder}
value={(form as any)[field.name]}
onChange={handleChange}
onFocus={()=>setFocused(field.name)}
onBlur={()=>setFocused(null)}
required
style={{
width:"100%",
padding:"11px 14px",
borderRadius:"8px",
border:focused===field.name
? "1.5px solid #C9A84C"
: "1.5px solid #e0e0e0",
background:focused===field.name?"#fffdf5":"#fafafa",
fontFamily:"DM Sans",
fontSize:"14px",
color:"#111",
outline:"none"
}}
/>

</div>
))}

{msg && (

<div
style={{
padding:"10px 14px",
borderRadius:"8px",
fontFamily:"DM Sans",
fontSize:"13px",
background:msg.ok?"#f0fdf4":"#fff5f5",
border:`1px solid ${msg.ok?"#86efac":"#fca5a5"}`,
color:msg.ok?"#16a34a":"#dc2626"
}}
>
{msg.text}
</div>

)}

<button
type="submit"
disabled={loading}
style={{
width:"100%",
padding:"13px",
borderRadius:"8px",
background:loading?"#d4b87a":"#C9A84C",
color:"#fff",
fontFamily:"DM Sans",
fontSize:"13px",
fontWeight:600,
letterSpacing:"1.5px",
textTransform:"uppercase",
border:"none",
cursor:loading?"not-allowed":"pointer",
boxShadow:"0 4px 14px rgba(201,168,76,0.35)"
}}
>

{loading?"Registering…":"Register"}

</button>

</form>

<div
style={{
margin:"22px 0 18px",
height:"1px",
background:"#f0f0f0"
}}
/>

<div
style={{
fontFamily:"DM Sans",
fontSize:"13px",
color:"#888",
textAlign:"center"
}}
>

Already have an account?{" "}
<Link
to="/student"
style={{color:"#C9A84C",fontWeight:600,textDecoration:"none"}}
>
Login here
</Link>

</div>

</div>
</div>

<p
style={{
fontFamily:"DM Sans",
fontSize:"11px",
color:"rgba(255,255,255,0.35)",
textAlign:"center",
marginTop:"20px"
}}
>
Event Management System · SSN College
</p>

</div>
</div>

)
}