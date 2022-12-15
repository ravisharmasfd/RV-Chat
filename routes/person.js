import { Router } from "express";
import User from '../models/user.js';
const router = Router();

router.get('/:username',async(req,res)=>{
    const userName = req.params.username;
    try{
        const person = await User.findOne({userName},{password : 0 , __v : 0});
    res.json({person})
    }catch(err){
            res.status(500).json({msg:"there is some problem"})
    }
})
router.get('/id/:_id',async(req,res)=>{
    const _id = req.params._id;
    try{
        const person = await User.findOne({_id},{password : 0 , __v : 0});
        res.json({person})
    }catch(err){
            res.status(500).json({msg:"there is some problem"})
    }
})

export default router;