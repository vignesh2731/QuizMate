import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import axios from "axios";

export function AttemptQuiz() {
  const [quizCode, setQuizCode] = useState("");
  const [quizPassword, setQuizPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/attemptQuiz",
        { quizCode, quizPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.msg) {
        setMessage("❌ " + response.data.msg);
      } else if (Array.isArray(response.data.questions)) {
        navigate("/attempt", { state: { quizCode, questions: response.data.questions } });
      } else {
        setMessage("❌ Unexpected response format. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Error fetching quiz: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="bg-violet-500 h-screen">
        <h1 className="text-white flex justify-center text-4xl pt-10 font-bold">📝&nbsp;Attempt a Quiz</h1>
        <div className="flex justify-center rounded pt-18 pl-5">
          <div className="bg-white w-100 h-100 flex rounded-4xl">
            <div className="flex flex-col items-center gap-4 pt-18 pl-17">
              <div className="pb-10">
                <input
                  type="text"
                  placeholder="Enter QuizCode"
                  className="border p-2 w-64"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value)}
                />
              </div>
              <div className="pb-10">
                <input
                  type="password"
                  placeholder="Quiz Password"
                  className="border p-2 w-64"
                  value={quizPassword}
                  onChange={(e) => setQuizPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="bg-orange-500 rounded-4xl w-40 h-10"
                  onClick={handleStartQuiz}
                >
                  ▶️ Start Quiz
                </button>
              </div>
              {message && <p className="text-red-500 mt-4">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
