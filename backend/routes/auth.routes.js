import express from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.get("/login", authController.login);

authRouter.get("/signup", authController.signUp);

authRouter.get("/logout", authController.logout);

export default authRouter;
