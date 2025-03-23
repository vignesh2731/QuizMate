import { useState } from "react";
import { useNavigate } from "react-router";

export function CreateQuiz()
{
    const navigate = useNavigate();
    const [quizCode,setQuizCode]=useState("");
    const [quizPassword,setQuizPassword]=useState("");

    const handleCreateQuiz = () => {
        navigate(`/quiz/?quizCode=${quizCode}&quizPassword=${quizPassword}`);
    };
    return <div className="bg-violet-500 h-screen pt-15">
            <h1 className="text-white flex justify-center text-4xl pt-10 font-bold">🎯&nbsp;Create a New Quiz</h1>
            <div className=" flex justify-center rounded pt-18 pl-5">
                <div className="bg-white w-100 h-100 flex rounded-4xl">
                    <div className="flex flex-col items-center gap-4 pt-18 pl-17">
                        <div className="pb-10">
                            <input type="text" placeholder="QuizName" className="border p-2 w-64" onChange={(e)=>setQuizCode(e.target.value)} />
                        </div>
                        <div className="pb-10">
                            <input type="text" placeholder="QuizPassword" className="border p-2 w-64 pt" onChange={(e)=>setQuizPassword(e.target.value)}/>
                        </div>
                        <div>
                            <button className="bg-orange-500 rounded-4xl w-40 h-10" onClick={handleCreateQuiz}>➕Create Quiz</button>
                        </div>
                    </div>

                </div>
            </div>
    </div>
}