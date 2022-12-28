import chatChannel from "../models/chatChannel.js";

const findChat = async(req,res)=>{
    try {
        const chat = await chatChannel.findOne({_id:req.params.id,
          members: { $in: req.user._id }
        });
        res.status(200).json(chat)
      } catch (error) {
        res.status(500).json(error)
      }
}
export default findChat;