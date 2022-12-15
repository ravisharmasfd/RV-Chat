import { Router } from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import authMiddleWare from "../middleWare/auth.js";
import { JWT_SECRET } from "../config/config.js";
import {loginController,registerController} from '../controllers/index.js'
const router = Router();

router.post("/register",registerController);
router.post("/login",loginController)


router.get('/userinfo',authMiddleWare,async(req,res)=>{
    res.json({msg:"you are authorize",user:req.user});
})
export default router;