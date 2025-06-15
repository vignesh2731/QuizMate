const express = require('express');
const authMiddleware = require('../middleware');
const { quizzes, marks, user } = require('../db');
const checkResultsRouter = express.Router();

checkResultsRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const username = req.username;
        const currentUser = await user.findOne({ username });

        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const quiz = await quizzes.find({ quizOwner: currentUser._id });
        const quizzesInfo = quiz.map(q => ({
            quizCode: q.quizCode,
            quizClass: q.className, 
        }));
        res.json({ msg: quizzesInfo });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

checkResultsRouter.get("/quiz", async (req, res) => {
    try {
        const name = req.query.name;
        const allMarks = await marks.find({ quizCode: name });
        const result = allMarks.map(i => ({ username: i.username, score: i.score }));
        res.json({ marks: result });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = checkResultsRouter;