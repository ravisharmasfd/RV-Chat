import User from '../models/user.js';

const findFriends = async(req,res)=>{
    try {
        const find = await User.find({},{firstName:1,lastName:1,userName:1,_id:1,followers:1,dp:1}).limit({$limit: 100})
        res.json(find)
    } catch (error) {
        res.status(500)
    }
    
}
export default findFriends;