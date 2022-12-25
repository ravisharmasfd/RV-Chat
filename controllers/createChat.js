import ChatChannel from '../models/chatChannel.js'

const createChat = async(req,res)=>{
    const members = [req.user._id,req.body._id]
    try {
        const chat = await new ChatChannel({members});
        await chat.save();
        res.json(chat);
    } catch (error) {
        res.status(500);
    }
}
export default createChat;