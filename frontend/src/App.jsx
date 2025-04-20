import { BrowserRouter, Route, Routes } from "react-router"
import { NavBar } from "./components/NavBar"
import { CreateQuiz } from "./components/CreateQuiz"
import { AttemptQuiz } from "./components/AttemptQuiz"
import { CheckResults } from "./components/CheckResults"
import { Dashboard } from "./components/dashboard"
import { Landing } from "./components/Landing"
import { QuizComp } from "./components/QuizComp"
import { AttemptComponent } from "./components/AttemptComponent"
import { AnswersComp } from "./components/Answers"


function App() {
  

  return (
    <>
        <BrowserRouter>
         <Routes>
          <Route path="/" element={<Landing></Landing>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/createQuiz" element={<QuizComp></QuizComp>}></Route>
          <Route path="/checkResults" element={<CheckResults></CheckResults>}></Route> 
          <Route path="/attemptComponent" element={<AttemptComponent></AttemptComponent>}></Route>
          <Route path="/answers" element={<AnswersComp></AnswersComp>}></Route>
         </Routes>
         </BrowserRouter>
    </>
  )
}

export default App
