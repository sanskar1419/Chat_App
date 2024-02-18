import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export default class MessagesController {
  async sendMessage(req, res) {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage);
      }

      // Both the task will run parallel
      await Promise.all([newMessage.save(), conversation.save()]);

      res.status(201).json(newMessage);
    } catch (err) {
      console.log("Error in message send Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async getMessages(req, res) {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
      }).populate("messages");

      if (!conversation) {
        res.status(404).json({
          error: "No Messages",
        });
      }

      res.status(200).json(conversation.messages);
    } catch (err) {
      console.log("Error in get messages Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
