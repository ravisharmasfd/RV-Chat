import mongoose from "mongoose";

const ChatChannel = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
); 
export default mongoose.model("ChatChannel", ChatChannel);