import { BrowserRouter, Route, Routes } from "react-router"
import { NavBar } from "./components/NavBar"
import { CreateQuiz } from "./components/CreateQuiz"
import { AttemptQuiz } from "./components/AttemptQuiz"
import { CheckResults } from "./components/CheckResults"
import { Dashboard } from "./components/Dashboard"
import { Landing } from "./components/Landing"
import { QuizComp } from "./components/QuizComp"
import { AttemptComponent } from "./components/AttemptComponent"
import { AnswersComp } from "./components/Answers"
import { PendingQuizzes } from "./components/PendingQuizzes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createQuiz" element={<QuizComp />} />
          <Route path="/checkResults" element={<CheckResults />} />
          <Route path="/attemptComponent" element={<AttemptComponent />} />
          <Route path="/answers" element={<AnswersComp />} />
          <Route path="/pendingQuizzes" element={<PendingQuizzes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
