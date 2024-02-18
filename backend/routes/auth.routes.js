import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);

authRouter.post("/signup", authController.signUp);

authRouter.post("/logout", authController.logout);

export default authRouter;
