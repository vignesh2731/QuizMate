const express = require('express');
const { user } = require('../db');
const signUpRouter = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../secretKey');

signUpRouter.use(express.json());

signUpRouter.post("/", async (req, res) => {
    try {
        const { username, password, class: userClass } = req.body;

        const userExists = await user.findOne({ username });
        if (userExists) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const newUser = await user.create({ 
            username, 
            password,
            class: userClass
        });

        const token = jwt.sign({ username: newUser.username }, key);

        res.json({
            msg: "Sign-up successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

module.exports = {
    signUpRouter
};
