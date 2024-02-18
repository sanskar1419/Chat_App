// Importing necessary file, module and package , and creating instances of them
import mongoose from "mongoose";

// Defining user schema
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we are going to access db
const Message = mongoose.model("Message", messageSchema);

// Exporting User Model
export default Message;
