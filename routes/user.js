import { Router } from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
const router = Router();

router.put('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSaltSync(10);
                req.body.password = await bcrypt.hashSync(req.body.password, salt);
            }catch(err){res.status(500).json({err})}  
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.body.id,{
                $set : req.body,
            });
            res.status(200).json({msg:"updated successfully."})
        }catch(err){res.status(500).json({err})}
    }else{
        res.status(403).json({msg:"You can not update other user."})
    }
})
router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const deleteUser = await User.deleteOne({_id:req.body.userId});
            res.status(200).json({msg:"delete successfully."})
        }catch(err){res.status(500).json({err})}
    
    }else{
        res.status(403).json({msg:"You can not delete other user."})
    }
})
router.get('/:id',async(req,res)=>{
   try{
    const {password,updatedAt, ...userInfo} = await User.findOne({_id:req.params.id});
    res.status(200).json(userInfo);
   }
   catch(err){
    res.status(500).json({msg:"server problem"});
   }
})
router.put('/follow/:id',async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const fUser = await User.findOne({_id:req.params.id});
            const currentUser = await User.findOne({_id:req.body.userId});
            if(!fUser.followers.include(req.body.userId)){
                const session = await mongoose.startSession();
                await session.startTransaction();
                try {
                    await fUser.updateOne({$push:{followers: req.body.userId}});
                    await currentUser.updateOne({$push:{following: req.params.id}});
                    res.status(200).json({msg: "task successfully have done"})
                    await session.commitTransaction();
                    session.endSession();
                    return true;
                  } catch (error) {
                    await session.abortTransaction();
                    session.endSession();
                    res.status(500).json({error})
                  }
                
            }else{
                res.status(403).json({msg:"You already follow this user"})
            }
        }catch(err){res.status(500).json({err})}
    }else{
        res.status(403).json({msg:"You can not follow yourself."})
    }
})
router.put('/unfollow/:id',async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const fUser = await User.findOne({_id:req.params.id});
            const currentUser = await User.findOne({_id:req.body.userId});
            if(fUser.followers.include(req.body.userId)){
                const session = await mongoose.startSession();
                await session.startTransaction();
                try {
                    await fUser.updateOne({$pull:{followers: req.body.userId}});
                    await currentUser.updateOne({$pull:{following: req.params.id}});
                    await session.commitTransaction();
                    session.endSession();
                    res.status(200).json({msg: "task successfully have done"});
                  } catch (error) {
                    await session.abortTransaction();
                    session.endSession();
                    res.status(500).json({error});
                  }
                
            }else{
                res.status(403).json({msg:"You don not follow this user"});
            }
        }catch(err){res.status(500).json({err})}
    }else{
        res.status(403).json({msg:"You can not unfollow yourself."})
    }
})
export default router;