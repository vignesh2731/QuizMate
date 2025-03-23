const mongoose=require('mongoose')
require("dotenv").config(); 
mongoose.connect(process.env.MONGO_URI);
const userSchema=new mongoose.Schema({
    username:String,
    password:String
})
const user=mongoose.model('user',userSchema);
const quizzesSchema=new mongoose.Schema({
    quizCode:String,
    quizOwner:String,
    quizPassword:String,
    listOfQuestions:[
        {
            questionName:String,
            options:[String],
            correctAnswer:String
        }
    ]
})
const quizzes=mongoose.model('quizzes',quizzesSchema);
const marksSchema=new mongoose.Schema({
    quizCode:String,
    username:String,
    score:Number,
})
const marks=mongoose.model('marks',marksSchema);
module.exports={
    user,
    quizzes,
    marks
}