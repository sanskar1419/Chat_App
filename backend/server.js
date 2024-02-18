import express from "express";
import dotenv from "dotenv";
const app = new express();
dotenv.config();
import authRouter from "./routes/auth.routes.js";

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("Welcome to chat app");
});

app.use("/api/auth", authRouter);

app.listen(9000, () => {
  console.log(`Server is listening to port :: ${PORT}`);
});
