import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { NavBar } from "./NavBar";

export function AttemptComponent() {
  const [quizCode, setQuizCode] = useState("");
  const [quizPassword, setQuizPassword] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchQuiz = async () => {
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
        const formattedQuestions = response.data.questions.map((q, index) => ({
          questionName: q?.questionName || `⚠️ Missing question text`,
          options: Array.isArray(q?.options) ? q.options : [],
        }));

        setQuestions(formattedQuestions);
        setSelectedAnswers(new Array(formattedQuestions.length).fill(""));
        setMessage("");
      } else {
        setMessage("❌ Unexpected response format. Please try again.");
      }
    } catch (error) {
      setMessage("❌ Error fetching quiz: " + (error.response?.data?.msg || error.message));
    }
  };

  const handleAnswerSelect = (qIndex, option) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[qIndex] = option;
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    navigate("/answers", { state: { quizCode, questions, selectedAnswers } });
  };

  return (
    <div>
      <NavBar />
      <div className="pt-40">
        <div className="p-5 bg-gray-100 rounded-lg shadow-md w-96 mx-auto">
          <h2 className="text-xl font-bold mb-4">📌 Attempt a Quiz</h2>

          <input
            type="text"
            placeholder="Quiz Code"
            className="w-full p-2 border rounded mb-2"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
          />
          <input
            type="password"
            placeholder="Quiz Password"
            className="w-full p-2 border rounded mb-4"
            value={quizPassword}
            onChange={(e) => setQuizPassword(e.target.value)}
          />
          <button
            onClick={fetchQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-3"
          >
            🔍 Fetch Quiz
          </button>

          {message && <p className="text-red-500 text-center">{message}</p>}

          {questions.length > 0 && (
            <div>
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="mb-4 p-3 bg-white rounded shadow">
                  <p className="font-semibold">
                    {qIndex + 1}. {q.questionName}
                  </p>
                  {q.options.length > 0 ? (
                    q.options.map((option, oIndex) => (
                      <label key={oIndex} className="flex items-center gap-2 mt-1">
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={option}
                          checked={selectedAnswers[qIndex] === option}
                          onChange={() => handleAnswerSelect(qIndex, option)}
                        />
                        {option}
                      </label>
                    ))
                  ) : (
                    <p className="text-red-500">⚠️ Options not available</p>
                  )}
                </div>
              ))}

              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full mt-3"
                onClick={handleSubmit}
              >
                ✅ Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
