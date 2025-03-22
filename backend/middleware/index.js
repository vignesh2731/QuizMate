const key=require('../secretKey')
const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization
    try{
        const decoded=jwt.verify(token,key);
        req.username=decoded.username
        next();
    }
    catch(error)
    {
        res.send({
            msg:"Authentication failed"
        })
    }
}
module.exports=authMiddleware