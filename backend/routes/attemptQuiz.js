const express=require('express');
const authMiddleware = require('../middleware');
const { quizzes, marks } = require('../db');
const attemptQuizRouter=express.Router();
attemptQuizRouter.use(express.json());
attemptQuizRouter.post("/",authMiddleware,async(req,res)=>{
    const {quizCode,quizPassword}=req.body;
    const quiz=await quizzes.findOne({
        quizCode,
        quizPassword
    });
    if(!quiz)
    {
        return res.json({
            msg:"Wrong quiz id"
        })
    }
    const result = quiz.listOfQuestions.map(i => ({ questionName: i.questionName, options: i.options }));
    console.log({
        questionName:quiz.listOfQuestions.questionName,
        questions:result,
    })
    res.json({
        questionName:quiz.listOfQuestions.questionName,
        questions:result,
    })
})
attemptQuizRouter.post("/answers",authMiddleware,async(req,res)=>{
    const {quizCode,answers}=req.body;
    const username=req.username
    const quiz=await quizzes.findOne({quizCode});
    const rightAnswers=quiz.listOfQuestions;
    let cnt=0;
    let n=1000;
    if(n>rightAnswers.length)n=rightAnswers.length;
    if(n>answers.length)n=answers.length
    for(let i=0;i<n;i++)
    {   
        if(rightAnswers[i].correctAnswer==answers[i])cnt++;
    }
    await marks.create({
        quizCode,
        username,
        score:cnt
    })
    res.json({score:cnt});
})
module.exports=attemptQuizRouter;