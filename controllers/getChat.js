import chatChannel from "../models/chatChannel.js";

const getChat = async(req,res)=>{
    try {
        const chat = await chatChannel.find({
          members: { $in: [req.user._id] },
        });
        res.status(200).json(chat);
      } catch (error) {
        res.status(500).json(error);
      }
}
export default getChat;