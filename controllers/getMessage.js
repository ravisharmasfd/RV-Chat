import chatChannel from "../models/chatChannel.js";
import message from "../models/message.js";

const getMessages = async (req, res) => {
    const { chatId } = req.params;  
    const chat = await chatChannel.findOne({_id:chatId});
    const match = chat.members.includes(req.user._id);
    try {
      if(match){
        const result = await message.find({ chatChannelId:chat._id });
      res.status(200).json(result);
      }else{
        res.status(400).json({msg:"you can not access this chat"});
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
  export default getMessages;