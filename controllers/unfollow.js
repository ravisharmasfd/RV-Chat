import User from '../models/user.js';


const unfollow = async(req,res)=>{

    const m = req.user._id.equals(req.params.id);
    if(!m){
        try{
            const currentUser = await User.findOne({_id:req.user._id});
            const fUser = await User.findOne({_id:req.params.id});
            if(fUser.followers.includes(req.user._id)){
                await fUser.updateOne({$pull:{followers: currentUser._id}});
                await currentUser.updateOne({$pull:{following: fUser._id}});
                res.status(200).json({msg: "task successfully have done"});    
            }else{
                res.status(403).json({msg:"You are not following this user"});
            }
        }catch(err){res.status(500).json({err})}
    }else{
        res.status(403).json({msg:"You can not unfollow yourself."})
    }
}
export default unfollow;