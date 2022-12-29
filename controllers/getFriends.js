import User from '../models/user.js';

const getFriends = async(req,res)=>{
    try {
        const data = await User.find({_id: { $in: req.user.following}},{password:0,__v:0,updatedAt:0,isAdmin:0});
        res.json({friends:data})
    } catch (error) {
        res.status(500).json({msg:"there is a error"})
    }
}
export default  getFriends;