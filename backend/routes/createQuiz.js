const express = require('express');
const createQuizRouter = express.Router();
createQuizRouter.use(express.json());

const authMiddleware = require('../middleware');
const { quizzes, user } = require('../db');

createQuizRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const { quizCode, quizPassword, listOfQuestions, className } = req.body; 
        const username = req.username;

        const currentUser = await user.findOne({ username });
        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        
        await quizzes.create({
            quizCode: quizCode,
            quizPassword: quizPassword,
            quizOwner: currentUser._id,
            className: className,  
            listOfQuestions: listOfQuestions,
            quizMarks: []
        });

        currentUser.quizzesHosted.push(currentUser._id);
        await currentUser.save();

        res.json({
            msg: "Quiz with code " + quizCode + " has been created for class " + className
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = {
    createQuizRouter
};
