import { useEffect } from "react";
import { Box } from "./Box";
import { useNavigate } from "react-router";

export function Landing()
{
    const navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token)
        {
            navigate("/dashboard");
        }
    },[])
    return <div className="bg-violet-600 h-screen pt-15">
        <div className="flex justify-center">
            <h1 className="text-white text-6xl font-bold">QuizMate</h1>
        </div>
        <div className="flex justify-center pt-5">
            <p className="text-white  font-bold text-2xl">Your Smart Quizzing Companion</p>
        </div>
        <div className="flex justify-evenly pt-15">
            <Box name={"Sign Up"} ending={"Register"} route={"signup"}></Box>
            <Box name={"Login"} ending={"Login"} route={"login"}></Box>
        </div>
    </div>
}