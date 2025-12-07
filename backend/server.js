require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { loginLimiter, Limiter } = require("./middleware/rateLimiter");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Povezan sa bazom."))
.catch(() => console.log("Nije povezan sa bazom."));

app.use(express.json());
app.use(cors('*'));
app.use(Limiter);

app.get("/", (req, res) => {
    res.send("Pocenta stranica.")
})

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(3000);