import ChatChannel from '../models/chatChannel.js'
import user from '../models/user.js';
const createChat = async(req,res)=>{    
    try {
        const findUser = await user.findById(req.body._id);
        if(findUser._id == req.user._id){
            res.status(400).json({msg:"you can not chat with yourself"})
            return;
        }
        const chatFind = await ChatChannel.findOne({
            members: { $all: [req.user._id, findUser._id] },
          });
          
        if(!chatFind && findUser._id){
            const membersChat = [req.user._id,findUser._id]
            const chat =  new ChatChannel({members:membersChat});
            await chat.save();
            res.json(chat);
        }else{
            if(chatFind){
                res.json({chat:chatFind});
            }
            else res.json({msg:"user not present"});
        }
    } catch (error) {
        res.status(500);
    }
}
export default createChat;