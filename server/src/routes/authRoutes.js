const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

const SECRET_KEY = "gayguys12";

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({
            email, 
            password
        });
        await user.save();

        const token = jwt.sign({userId: user._id}, SECRET_KEY);

        res.send(
            {token}
        );
    } catch (err) {
        console.error("Something went wrong with saving to user to database!", err);
        return res.status(422).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: "Must provide email and password!" });
    }

    const user = await User.findOne({
        email
    });

    if (!user) {
        return res.status(404).send({
            error: "Email address not found!"
        });
    }

    try {
        await user.comparePasswords(password);
        const token = jwt.sign({userId: user._id}, SECRET_KEY);
        res.send({token});
    } catch (err) {
        return res.status(422).send({
            error: "Password does not match!"
        });
    }
})

module.exports = router;