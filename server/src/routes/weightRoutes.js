const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const User = mongoose.model("User");

const router = express.Router();

router.use(requireAuth);

router.get("/weights", (req, res) => {
    const weights = req.user.weightEntries;
    res.send(weights);
});

router.post("/weights", async (req, res) => {
    const { weightEntry } = req.body;

    if (!weightEntry) {
        return res.status(422).send("You must provide at least a weight data!");
    }

    try {
        const doc = await User.findOne({ email: req.user.email });

        doc.weightEntries = [...doc.weightEntries, weightEntry ];
        await doc.save();
        return res.send(doc);
    } catch (err) {
        console.error(err.message);
        return res.send(422, { error: err });
    }
});

module.exports = router;