const express=require('express');
const { user } = require('../db');
const signUpRouter=express.Router();
const jwt=require('jsonwebtoken');
const key = require('../secretKey');
signUpRouter.use(express.json());
signUpRouter.post("/",async(req,res)=>
{
    const {username,password}=req.body;
    const userExists=await user.findOne({username});
    if(userExists)
    {
        return res.json({
            msg:"User already exists"
        })
    }
    await user.create({
        username,
        password
    })
    const token=jwt.sign({username},key);
    console.log(token);
    res.json({
        msg:token
    })
})
module.exports={
    signUpRouter
}