const express=require('express');
const { user } = require('../db');
const signUpRouter=express.Router();
const jwt=require('jsonwebtoken');
const key = require('../secretKey');
signUpRouter.use(express.json());
signUpRouter.post("/",async(req,res)=>
{
    const {username,password}=req.body;
    await user.create({
        username,
        password
    })
    const token=jwt.sign({username},key);
    console.log(token);
    res.json({
        key:token
    })
})
module.exports={
    signUpRouter
}