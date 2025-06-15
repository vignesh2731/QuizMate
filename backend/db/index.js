const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    class:String,
    quizzesHosted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quizzes"
    }],
    quizzesAttempted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quizzes"
    }]
},{timestamps:true})
const user=mongoose.model('user',userSchema);
const quizzesSchema=new mongoose.Schema({
    quizCode:String,
    quizOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    className: String,
    quizPassword:String,
    listOfQuestions:[
        {
            questionName:String,
            options:[String],
            correctAnswer:String
        }
    ],
    quizMarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"marks"
    }]
},{timestamps:true})
const quizzes=mongoose.model('quizzes',quizzesSchema);
const marksSchema=new mongoose.Schema({
    quizCode:String,
    username:String,
    score:Number,
},{timestamps:true})
const marks=mongoose.model('marks',marksSchema);
module.exports={
    user,
    quizzes,
    marks
}