import { useNavigate } from "react-router";

export function Dashboard() {
    const navigate=useNavigate();

    return (
        <div className="bg-violet-500 h-screen flex items-center justify-center">
            <div className="flex flex-col gap-4">
                <button className="bg-white px-6 py-3 rounded-lg shadow-md w-100 h-20 cursor-pointer" onClick={()=>{
                    navigate('/createQuiz')
                }
                }> ➕ &nbsp;&nbsp;&nbsp;Create Quiz</button>
                <button className="bg-white px-6 py-3 rounded-lg shadow-md w-100 h-20 cursor-pointer" onClick={()=>{
                    navigate('/attemptComponent')
                }}>📝 &nbsp;&nbsp;&nbsp;Attempt Quiz</button>
                <button className="bg-white px-6 py-3 rounded-lg shadow-md w-100 h-20 cursor-pointer" onClick={()=>{
                    navigate("/checkResults")
                }}>📊 &nbsp;&nbsp;&nbsp;Check Result</button>
            </div>
        </div>
    );
}


