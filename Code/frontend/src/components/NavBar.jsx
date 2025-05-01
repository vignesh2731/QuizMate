import { Link, useNavigate } from "react-router"

export function NavBar()
{
    const navigate=useNavigate();
    return <div className="bg-white-500 h-20 pl-15 pt-3 flex border-b-1">
        <Link to={"/dashboard"}>
            <img src="logo.png" alt="" className=" h-16  rounded-full object-cover cursor-pointer" onClick={()=>{
                e.preventDefault(); 
                navigate('/dashboard');
            }}/>
        </Link>
            <div className="pl-300 flex justify-center pt-2">
                <button className="bg-orange-500 rounded-xl h-10 pl-8 pr-20 w-15 text-white cursor-pointer" onClick={()=>{
                    localStorage.removeItem("token");
                    navigate("/");
                }}> Logout </button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer size-15 pl-5 pb-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </div>
    </div>
}