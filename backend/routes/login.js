const express=require('express');
const { user } = require('../db');
const loginRouter=express.Router();
const jwt=require('jsonwebtoken');
const key = require('../secretKey');
loginRouter.use(express.json())
loginRouter.post("/",async(req,res)=>{
    const {username,password}=req.body;
    const userExists= await user.findOne({username:username,
        password:password
    });
    if(!userExists)
    {
        return res.json({
            msg:"Username doesnot exists"
        })
    }
    const token=jwt.sign({username:username},key);
    res.json({
        msg:token
    })
})
module.exports={
    loginRouter
}