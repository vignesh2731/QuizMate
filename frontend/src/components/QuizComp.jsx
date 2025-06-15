import { useState } from "react";
import axios from "axios";
import { NavBar } from "./NavBar";

export function QuizComp() {
  const [quizCode, setQuizCode] = useState("");
  const [quizPassword, setQuizPassword] = useState("");
  const [className, setClassName] = useState(""); 
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
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correct: "" }]);
  };

  const startSpeechRecognition = (setter) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported on this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setter(speechText);
    };

    recognition.start();
  };

  const startQuestionVoice = (index) => {
    startSpeechRecognition((text) => handleQuestionChange(index, text));
  };

  const startOptionVoice = (qIndex, oIndex) => {
    startSpeechRecognition((text) => handleOptionChange(qIndex, oIndex, text));
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
          className,
          listOfQuestions: formattedQuestions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`✅ ${response.data.msg}`);
      alert("Quiz has been created successfully");
    } catch (error) {
      setMessage("❌ Error creating quiz: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div>
      <NavBar />
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
        
        <input
          type="text"
          placeholder="Class Name"
          className="w-full p-2 border rounded mb-4"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4 p-3 bg-white rounded shadow">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Question"
                className="w-full p-2 border rounded"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
              <button
                onClick={() => startQuestionVoice(qIndex)}
                className="p-2 bg-gray-200 rounded-full text-lg"
                title="Speak Question"
              >
                🎤
              </button>
            </div>

            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2 mb-1">
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  className="w-full p-2 border rounded"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
                <button
                  onClick={() => startOptionVoice(qIndex, oIndex)}
                  className="p-2 bg-blue-200 rounded-full text-lg"
                  title={`Speak Option ${oIndex + 1}`}
                >
                  🎤
                </button>
              </div>
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

        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
        >
          ➕ Add Question
        </button>
        <button
          onClick={createQuiz}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          ✅ Create Quiz
        </button>

        {message && <p className="mt-3 text-center font-semibold">{message}</p>}
      </div>
    </div>
  );
}
