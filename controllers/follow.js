import User from '../models/user.js';

const follow = async(req,res)=>{
    console.log(1);
    const m = req.user._id.equals(req.params.id);
    if(!m){
        try{
            const currentUser = await User.findOne({_id:req.user._id});
            const fUser = await User.findOne({_id:req.params.id});         
            if(!fUser.followers.includes(req.user._id)){
                await fUser.updateOne({$push:{followers: currentUser._id}});
                await currentUser.updateOne({$push:{following: fUser._id}});                  
                res.status(200).json({msg: "task successfully have done"})           
            }else{
                res.status(403).json({msg:"You already follow this user"})
            }
        }catch(err){
            res.status(500).json({msg: "server error"})
        }
    }else{
        res.status(403).json({msg:"You can not follow yourself."})
    }
}
export default follow;