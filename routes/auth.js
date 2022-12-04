import { Router } from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
const router = Router();

router.post("/register",async(req,res)=>{
    const {username,firstName, lastName,email,password} = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    const newUser = await new User({username,firstName, lastName,email,password:hash});

    try{
        const createUser = await newUser.save();
        res.status(201).json({msg:'new user ${firstName} ${lastName} is created on rv chat'})
    }
    catch(err){
        console.log(err)
    }
})
router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        const match = await bcrypt.compare(password, userExist.password);
        if(match){
            res.json({msg : "user is exist with this details"})
        }else{
            res.status(401).json({msg : "check your details"})
        }
    }else{
        res.status(400).json({msg: "check your details"})
    }
})
export default router;