require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const { loginLimiter, Limiter } = require("./middleware/rateLimiter");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const taskRouter = require("./routes/task");

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
app.use("/project", projectRouter);
app.use("/task", taskRouter);

app.listen(3000);