// Importing necessary file, module and package , and creating instances of them
import mongoose from "mongoose";

// Defining user schema
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Creating variable through which we are going to access db
const Conversation = mongoose.model("Conversation", conversationSchema);

// Exporting User Model
export default Conversation;
