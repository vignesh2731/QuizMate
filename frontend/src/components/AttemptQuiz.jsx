import { NavBar } from "./NavBar";

export function AttemptQuiz()
{
    return <div> 
        <NavBar/>
    <div className="bg-violet-500 h-screen">
            <h1 className="text-white flex justify-center text-4xl pt-10 font-bold">📝&nbsp;Attempt a  Quiz</h1>
            <div className=" flex justify-center rounded pt-18 pl-5">
                <div className="bg-white w-100 h-100 flex rounded-4xl">
                    <div className="flex flex-col items-center gap-4 pt-18 pl-17">
                        <div className="pb-10">
                            <input type="text" placeholder="Enter QuizCode" className="border p-2 w-64" />
                        </div>
                        <div className="pb-10">
                            <input type="text" placeholder="Quiz Password" className="border p-2 w-64 pt" />
                        </div>
                        <div>
                            <button className="bg-orange-500 rounded-4xl w-40 h-10" onClic>▶️Start Quiz</button>
                        </div>
                    </div>

                </div>
            </div>
    </div>
    </div>
}