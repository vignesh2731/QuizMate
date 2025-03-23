import { useState } from "react";
import axios from "axios";

export function QuizComp() {
  const [quizCode, setQuizCode] = useState("");
  const [quizPassword, setQuizPassword] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correct: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;

    if (updatedQuestions[qIndex].correct === updatedQuestions[qIndex].options[oIndex]) {
      updatedQuestions[qIndex].correct = value;
    }

    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correct = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const startSpeechRecognition = (index) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      handleQuestionChange(index, speechText);
    };

    recognition.start();
  };

  const createQuiz = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ User not authenticated. Please log in.");
      return;
    }

    const formattedQuestions = questions.map((q) => ({
      questionName: q.question,
      options: q.options,
      correctAnswer: q.correct,
    }));

    try {
      const response = await axios.post(
        "http://localhost:3000/createQuiz",
        {
          quizCode,
          quizPassword,
          listOfQuestions: formattedQuestions,
        },
        {
          headers: { Authorization: token },
        }
      );

      setMessage(`✅ ${response.data.msg}`);
      alert("Quiz has been created successfully");
    } catch (error) {
      setMessage("❌ Error creating quiz: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div className="pt-10 bg-gray-100 rounded-lg shadow-md w-200 mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a Quiz</h2>

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

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4 p-3 bg-white rounded shadow">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Question"
              className="w-full p-2 border rounded"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />
            <button onClick={() => startSpeechRecognition(qIndex)} className="p-2 bg-gray-200 rounded-full">
              🎤
            </button>
          </div>

          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              placeholder={`Option ${oIndex + 1}`}
              className="w-full p-2 border rounded mb-1"
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
            />
          ))}

          <select
            className="w-full p-2 border rounded"
            value={q.correct}
            onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
          >
            <option value="" disabled>
              Select Correct Answer
            </option>
            {q.options.map((option, index) => (
              <option key={index} value={option}>
                {option || `Option ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full">
        ➕ Add Question
      </button>
      <button onClick={createQuiz} className="bg-green-500 text-white px-4 py-2 rounded w-full">
        ✅ Create Quiz
      </button>

      {message && <p className="mt-3 text-center font-semibold">{message}</p>}
    </div>
  );
}
