import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatChannelId: {
      type: mongoose.ObjectId,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);