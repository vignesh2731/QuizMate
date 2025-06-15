const express = require('express');
const authMiddleware = require('../middleware');
const { quizzes, marks, user } = require('../db');
const attemptQuizRouter = express.Router();

attemptQuizRouter.use(express.json());

attemptQuizRouter.get("/pending", authMiddleware, async (req, res) => {
    try {
        const username = req.username;
        const currentUser = await user.findOne({ username });

        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        const pendingQuizzes = await quizzes.find({
            className: currentUser.class,
            _id: { $nin: currentUser.quizzesAttempted }
        });

        const quizList = pendingQuizzes.map((quiz) => ({
            quizCode: quiz.quizCode,
            quizOwner: quiz.quizOwner,
            className: quiz.className || "N/A" 
        }));

        res.json({
            pendingQuizzes: quizList
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});


attemptQuizRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const { quizCode, quizPassword } = req.body;
        const quiz = await quizzes.findOne({ quizCode, quizPassword });

        if (!quiz) {
            return res.status(404).json({ msg: "Wrong quiz id" });
        }

        const result = quiz.listOfQuestions.map(i => ({
            questionName: i.questionName,
            options: i.options
        }));

        res.json({
            questions: result
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

attemptQuizRouter.post("/answers", authMiddleware, async (req, res) => {
    try {
        const { quizCode, answers } = req.body;
        const username = req.username;

        const quiz = await quizzes.findOne({ quizCode });

        if (!quiz) {
            return res.status(404).json({ msg: "Quiz not found" });
        }

        const currentUser = await user.findOne({ username });

        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (currentUser.quizzesAttempted.includes(quiz._id)) {
            return res.status(400).json({ msg: "You have already attempted this quiz" });
        }

        const rightAnswers = quiz.listOfQuestions;
        let cnt = 0;
        let n = 1000;

        if (n > rightAnswers.length) n = rightAnswers.length;
        if (n > answers.length) n = answers.length;

        for (let i = 0; i < n; i++) {
            if (rightAnswers[i].correctAnswer === answers[i]) cnt++;
        }

        const mark = await marks.create({
            quizCode,
            username,
            score: cnt
        });

        quiz.quizMarks.push(mark._id);
        await quiz.save();

        currentUser.quizzesAttempted.push(quiz._id);
        await currentUser.save();

        res.json({ score: cnt });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = attemptQuizRouter;
