const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const telegramController = require("./api/telegram/telegram.controller");

const app = express();

mongoose
    .connect(process.env.DB)
    .then((res) => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "public")));
} else {
    const corsOptions = {
        origin: [
            "http://127.0.0.1:5173",
            "http://localhost:5173",
            "http://127.0.0.1:5174",
            "http://localhost:5174",
            "http://127.0.0.1:3000",
            "http://localhost:3000",
            "http://localhost:3030",
            "http://127.0.0.1:27017",
            "http://localhost:27017",
        ],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

const usersRoutes = require("./api/users/users.routes");
const lessonsRoutes = require("./api/lessons/lessons.routes");
const telegramRoutes = require("./api/telegram/telegram.routes");

app.use("/api/auths", usersRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/", telegramRoutes);

app.post("*", async (req, res) => {
    if (req.body.message) res.send(await telegramController.messageHandler(req));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server started on port", port));
