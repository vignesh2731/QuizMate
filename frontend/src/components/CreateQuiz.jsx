import { useState } from "react";
import { useNavigate } from "react-router";
import { NavBar } from "./NavBar";

export function CreateQuiz() {
  const navigate = useNavigate();
  const [quizCode, setQuizCode] = useState("");
  const [quizPassword, setQuizPassword] = useState("");
  const [options, setOptions] = useState(["", ""]); // Default two options

  const handleCreateQuiz = () => {
    navigate(`/quiz/?quizCode=${quizCode}&quizPassword=${quizPassword}`, {
      state: { options },
    });
  };

  const handleVoiceInput = (setter) => {
    const recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      null;

    if (!recognition) {
      alert("Speech Recognition not supported on this browser");
      return;
    }

    const recognizer = new recognition();
    recognizer.lang = "en-US";
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;

    recognizer.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim();
      setter(spokenText);
    };

    recognizer.onerror = (e) => {
      console.error("Speech recognition error:", e);
    };

    recognizer.start();
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleOptionVoiceInput = (index) => {
    const recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      null;

    if (!recognition) {
      alert("Speech Recognition not supported on this browser");
      return;
    }

    const recognizer = new recognition();
    recognizer.lang = "en-US";
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 1;

    recognizer.onresult = (event) => {
      const spokenText = event.results[0][0].transcript.trim();
      const updated = [...options];
      updated[index] = spokenText;
      setOptions(updated);
    };

    recognizer.onerror = (e) => {
      console.error("Option voice input error:", e);
    };

    recognizer.start();
  };

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  return (
    <div>
      <NavBar/>
    <div className="bg-violet-500 min-h-screen pt-10 w-full">
      <h1 className="text-white flex justify-center text-4xl font-bold">
        🎯 Create a New Quiz
      </h1>

      <div className="flex justify-center mt-10">
        <div className="bg-white p-8 rounded-3xl shadow-lg flex flex-col gap-6 items-center w-96">
          
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Quiz Name"
              className="border p-2 w-full rounded"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
            />
            <button
              onClick={() => handleVoiceInput(setQuizCode)}
              className="bg-purple-500 text-white px-3 py-2 rounded-full text-lg"
              title="Speak Quiz Name"
            >
              🎤
            </button>
          </div>

          {/* Quiz Password */}
          <div className="flex items-center gap-2 w-full">
            <input
              type="text"
              placeholder="Quiz Password"
              className="border p-2 w-full rounded"
              value={quizPassword}
              onChange={(e) => setQuizPassword(e.target.value)}
            />
            <button
              onClick={() => handleVoiceInput(setQuizPassword)}
              className="bg-purple-500 text-white px-3 py-2 rounded-full text-lg"
              title="Speak Quiz Password"
            >
              🎤
            </button>
          </div>

          {/* Options */}
          <div className="w-full">
            <p className="font-semibold mb-2 text-center">📝 Enter Options:</p>
            {options.map((opt, index) => (
              <div
                key={index}
                className="flex items-center gap-3 mb-3"
              >
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="border p-2 w-full rounded"
                />
                <button
                  onClick={() => handleOptionVoiceInput(index)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full text-lg"
                  title={`Speak Option ${index + 1}`}
                >
                  🎤
                </button>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                onClick={addOptionField}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 mt-2 rounded-lg"
              >
                ➕ Add Option
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="bg-orange-500 text-white font-bold rounded-3xl w-full py-2 mt-4"
            onClick={handleCreateQuiz}
          >
            ➕ Create Quiz
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
