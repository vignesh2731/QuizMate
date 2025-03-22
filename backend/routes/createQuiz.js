const express=require('express');
const createQuizRouter=express.Router();
createQuizRouter.use(express.json());
const authMiddleware = require('../middleware');
const { quizzes } = require('../db');
createQuizRouter.post("/",authMiddleware,async(req,res)=>{
    const {quizCode,quizPassword,listOfQuestions}=req.body;
    const username=req.username
    await quizzes.create({
        quizCode:quizCode,
        quizPassword:quizPassword,
        quizOwner:username,
        listOfQuestions:listOfQuestions
    })
    res.json({
        msg:"Quiz name with code "+quizCode+ " has been created"
    })
})
module.exports={
    createQuizRouter
}