const express = require('express');
const { user } = require('../db');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../secretKey');

loginRouter.use(express.json());

loginRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await user.findOne({ username, password });

        if (!userExists) {
            return res.status(404).json({
                msg: "Username does not exist or incorrect password"
            });
        }

        const token = jwt.sign({ username: userExists.username }, key);

        res.json({
            msg: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

module.exports = {
    loginRouter
};
