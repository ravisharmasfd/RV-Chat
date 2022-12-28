import message from "../models/message.js";

const addMessage = async (req, res) => {
    const { chatChannelId, text } = req.body;
    const msg = new message({
        chatChannelId,
        senderId:req.user._id,
        text,
    });
    try {
      const result = await msg.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  export default addMessage;