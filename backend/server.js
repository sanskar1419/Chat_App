import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { connectUsingMongoose } from "./config/connectToMongoDB.js";

const app = new express();
dotenv.config();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  connectUsingMongoose();
  console.log(`Server is listening to port :: ${PORT}`);
});
