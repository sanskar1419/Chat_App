import express from "express";
import AuthController from "../controllers/auth.controller.js";
import userRegistrationDataMiddleware from "../middleware/user.data.middleware.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);

authRouter.post(
  "/signup",
  userRegistrationDataMiddleware,
  authController.signUp
);

authRouter.post("/logout", authController.logout);

export default authRouter;
