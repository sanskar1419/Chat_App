import express from "express";
import MessagesController from "../controllers/message.controller.js";
import jwtAuth from "../middleware/jwtAuth.middleware.js";

const messagesRouter = express.Router();
const messagesController = new MessagesController();

messagesRouter.get("/:id", jwtAuth, messagesController.getMessages);
messagesRouter.post("/send/:id", jwtAuth, messagesController.sendMessage);

export default messagesRouter;
