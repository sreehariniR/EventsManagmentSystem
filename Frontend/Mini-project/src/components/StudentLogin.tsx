import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin() {

const navigate = useNavigate()

const [form,setForm] = useState({
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

const res = await fetch("http://localhost:8081/login/",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(form)
})

if(!res.ok) throw new Error()

const events = await res.json()

if(events && events.length>=0){

localStorage.setItem("studentEmail",form.email)

setMsg({text:"Login successful! Redirecting…",ok:true})

setTimeout(()=>{
navigate("/studentevents",{state:events})
},1200)

}else{

setMsg({text:"Invalid credentials. Please try again.",ok:false})

}

}catch{

setMsg({text:"Login failed. Server error.",ok:false})

}finally{

setLoading(false)

}

}

const fields=[
{label:"Email",name:"email",type:"email",placeholder:"student@gmail.com"},
{label:"Password",name:"password",type:"password",placeholder:"Your password"}
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

<h1
style={{
fontFamily:"Playfair Display",
fontSize:"26px",
fontWeight:700,
color:"#111"
}}
>
Welcome Back
</h1>

<p className="text-sm text-gray-500 mb-6">
Student Portal — Sign in to view your events
</p>

<form
onSubmit={handleSubmit}
style={{display:"flex",flexDirection:"column",gap:"18px"}}
>

{fields.map((field)=>(
<div key={field.name}>

<label
style={{
fontSize:"11px",
fontWeight:600,
letterSpacing:"1.5px",
textTransform:"uppercase",
color:focused===field.name?"#C9A84C":"#555"
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
?"1.5px solid #C9A84C"
:"1.5px solid #e0e0e0",
background:focused===field.name?"#fffdf5":"#fafafa"
}}
/>

</div>
))}

{msg && (
<div
style={{
padding:"10px",
borderRadius:"8px",
background:msg.ok?"#f0fdf4":"#fff5f5",
color:msg.ok?"#16a34a":"#dc2626"
}}
>
{msg.text}
</div>
)}

<button
type="submit"
disabled={loading}
className="bg-yellow-600 text-white p-3 rounded"
>
{loading?"Signing in…":"Sign In"}
</button>

</form>

<div className="text-center mt-4">

Don't have an account?{" "}
<Link to="/studentregister" style={{color:"#C9A84C",fontWeight:600}}>
Register here
</Link>

</div>

</div>
</div>

</div>
</div>

)
}