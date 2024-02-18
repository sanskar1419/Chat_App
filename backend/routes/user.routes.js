import express from "express";
import UserController from "../controllers/user.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const usersRouter = express.Router();
const userController = new UserController();

usersRouter.get("/", jwtAuth, userController.getSideBarMessage);

export default usersRouter;
