const express=require('express');
const authMiddleware = require('../middleware');
const { quizzes, marks } = require('../db');
const checkResultsRouter=express.Router();
checkResultsRouter.get("/",authMiddleware,async(req,res)=>{
    const username=req.username;
    const quiz=await quizzes.find({
        quizOwner:username
    })
    const names=[];
    for(let i=0;i<quiz.length;i++)
    {
        names.push(quiz[i].quizCode);
    }
    res.json({
        msg:names
    })
})
checkResultsRouter.get("/quiz",async(req,res)=>{
    const name=req.query.name;
    const allMarks=await marks.find({quizCode:name});
    const result = allMarks.map(i => ({ username: i.username, score: i.score }));
    res.json({
        marks:result
    })
})

module.exports=checkResultsRouter