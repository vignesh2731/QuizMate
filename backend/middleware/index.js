const key=require('../secretKey')
const jwt=require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: "Authentication token is missing" });
    }
  
    try {
      const decoded = jwt.verify(token, key);
      req.username = decoded.username;
      next();
    } catch (error) {
      console.error("Authentication failed:", error);
      return res.status(401).json({ msg: "Authentication failed" });
    }
  };
  
module.exports=authMiddleware