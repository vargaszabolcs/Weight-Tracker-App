require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("./middleware/requireAuth");
const authRoutes = require("./routes/authRoutes")
const weightRoutes = require("./routes/weightRoutes")

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(weightRoutes);

const mongooseUri = "mongodb+srv://admin:admin@weightcluster.706b5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongooseUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to MongoDB!");
})

mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB!", err);
})

app.get("/", (req, res) => {
    res.send("Yeye!");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});