import { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "./NavBar";
import * as XLSX from 'xlsx';  

export function CheckResults() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHostedQuizzes();
  }, []);

  const fetchHostedQuizzes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/checkResults", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data || !Array.isArray(response.data.msg) || response.data.msg.length === 0) {
        setMessage("⚠️ You haven't hosted any quizzes yet.");
        setQuizzes([]);
      } else {
        setQuizzes(response.data.msg);
      }
    } catch (error) {
      setMessage("❌ Error fetching quizzes: " + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizResults = async (quizCode) => {
    setSelectedQuiz(quizCode);
    setMarks([]);
    setMessage("⌛ Loading results...");

    try {
      const response = await axios.get(`http://localhost:3000/checkResults/quiz?name=${quizCode}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const resultData = response.data.marks;

      if (!Array.isArray(resultData) || resultData.length === 0) {
        setMessage("⚠️ No submissions yet.");
        setMarks([]);
      } else {
        setMarks(resultData);
        setMessage("");
      }
    } catch (error) {
      setMessage("❌ Error fetching results: " + (error.response?.data?.msg || error.message));
    }
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(marks.map(mark => ({
      Username: mark.username,
      Score: mark.score,
    })));
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, "quiz_results.xlsx");
  };

  return (
    <div>
      <NavBar />
      <div className="bg-violet-500 h-screen flex flex-col items-center pt-10">
        <h1 className="text-white text-4xl font-bold">📥 Check your Results</h1>

        <div className="bg-white mt-10 p-5 rounded-2xl shadow-lg w-96">
          {loading ? (
            <p className="text-center">⌛ Loading...</p>
          ) : message ? (
            <p className="text-red-500 text-center">{message}</p>
          ) : selectedQuiz ? (
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">📊 Results for: {selectedQuiz}</h3>
              {marks.length === 0 ? (
                <p className="text-center">⚠️ No submissions yet.</p>
              ) : (
                <ul>
                  {marks.map((mark, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded shadow mt-2 text-center">
                      {mark.username}: <strong>{mark.score}</strong>
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
                onClick={() => setSelectedQuiz(null)}
              >
                🔙 Back to Quizzes
              </button>
              <button
                className="mt-5 bg-green-500 text-white py-2 px-4 rounded-lg w-full"
                onClick={exportToExcel} // Add the export button
              >
                📊 Export to Excel
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">📋 Your Hosted Quizzes</h3>
              <ul>
                {quizzes.map((quiz, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 rounded shadow cursor-pointer text-center mt-2 hover:bg-gray-200"
                    onClick={() => fetchQuizResults(quiz.quizCode)}
                  >
                    📌 {quiz.quizCode} &nbsp; {quiz.quizClass}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
