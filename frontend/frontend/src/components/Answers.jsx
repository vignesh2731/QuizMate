import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function AnswersComp() {
  const location = useLocation();

  const { quizCode, questions, selectedAnswers } = location.state || {}; 
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");

  const submitAnswers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/attemptQuiz/answers",
        { quizCode, answers: selectedAnswers },
        { headers: { Authorization: `${token}` } }
      );

      setScore(response.data.score);
      setMessage(`✅ Quiz submitted! Your score: ${response.data.score}`);
    } catch (error) {
      setMessage("❌ Error submitting quiz: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold mb-4">📊 Submit Your Answers</h2>

      <button onClick={submitAnswers} className="bg-green-500 text-white px-4 py-2 rounded w-full">
        ✅ Submit Quiz
      </button>

      {message && <p className="mt-3 text-center font-semibold">{message}</p>}
      {score !== null && <p className="text-xl font-bold text-center mt-2">🎯 Your Score: {score}</p>}
    </div>
  );
}
