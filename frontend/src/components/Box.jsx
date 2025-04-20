import axios from "axios";
import { useState } from "react";
import {useNavigate} from "react-router"
export function Box({ name, ending,route}) {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const navigate=useNavigate();
    return (
        <div>   
        <div className="bg-white rounded-2xl h-90 p-6 flex flex-col items-center justify-center space-y-4 w-80">
            <div className="text-center font-semibold text-lg">{name}</div>


            <input 
                type="text" 
                placeholder="Username" 
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
                onChange={(e)=>setUsername(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="bg-orange-500 text-white px-6 py-2 rounded w-full max-w-xs cursor-pointer" onClick={async()=>{
                const response=await axios.post("http://localhost:3000/"+route,{
                    username:username,
                    password:password
                })
                const token=response.data.msg;
                if(token==="Username doesnot exists")
                {
                    setMessage("Wrong creds")
                }
                else {
                    localStorage.setItem("token",token);
                    setMessage(route+" Successful");
                    navigate("/dashboard");
                }
            }}>
                {ending}
            </button>
            {message}
        </div>
        </div>
    );
}
