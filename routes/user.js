import { Router } from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import authMiddleWare from '../middleWare/auth.js'

const router = Router();


router.put('/',authMiddleWare,async(req,res)=>{
        try{
            const {firstName,lastName,description,gender ,city,from,relation} = req.body;
            if(firstName && lastName && description && gender && city && from && relation){
                const updateUser = await User.findByIdAndUpdate(req.user._id,{
                    $set : req.body,
                });
                const us = await User.findOne({_id:req.user._id},{password:0,__v:0,isAdmin:0,updatedAt:0});
                res.status(200).json({msg:"updated successfully.",data:us});
            }
            else req.status(400);
        }catch(err){res.status(500).json({err})}
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

router.put('/follow/:id',authMiddleWare,async(req,res)=>{
    console.log(1);
    const m = req.user._id.equals(req.params.id);
    if(!m){
        try{
            const currentUser = await User.findOne({_id:req.user._id});
            const fUser = await User.findOne({_id:req.params.id});         
            if(!fUser.followers.includes(req.user._id)){
                await fUser.updateOne({$push:{followers: currentUser._id}});
                await currentUser.updateOne({$push:{following: fUser._id}});                  
                console.log('success');
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
})
router.put('/unfollow/:id',authMiddleWare,async(req,res)=>{

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
})
router.get('/friends',authMiddleWare,async(req,res)=>{
    try {
        const data = await User.find({_id: { $in: req.user.following}},{password:0,__v:0,updatedAt:0,isAdmin:0});
        res.json({friends:data})
    } catch (error) {
        res.status(500).json({msg:"there is a error"})
    }
})
export default router;