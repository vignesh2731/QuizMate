const express=require('express');
const { signUpRouter } = require('./routes/signUp');
const { loginRouter } = require('./routes/login');
const { createQuizRouter } = require('./routes/createQuiz');
const attemptQuizRouter = require('./routes/attemptQuiz');
const checkResultsRouter = require('./routes/checkResults');

const app=new express();
const cors=require('cors')
app.use(cors())
app.use("/signup",signUpRouter);
app.use("/login",loginRouter);
app.use("/createQuiz",createQuizRouter);
app.use("/attemptQuiz",attemptQuizRouter);
app.use("/checkResults",checkResultsRouter)
app.listen(3000,()=>{
    console.log("Listening to port 3000");
})