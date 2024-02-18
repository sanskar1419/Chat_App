import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import messagesRouter from "./routes/messages.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectUsingMongoose } from "./config/connectToMongoDB.js";

const app = new express();
dotenv.config();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  connectUsingMongoose();
  console.log(`Server is listening to port :: ${PORT}`);
});
