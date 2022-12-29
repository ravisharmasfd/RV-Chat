import { Router } from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import authMiddleWare from '../middleWare/auth.js'
import {findFriends,follow,getFriends,unfollow, updateUser} from '../controllers/index.js'
const router = Router();


router.put('/',authMiddleWare,updateUser)

router.put('/follow/:id',authMiddleWare, follow)
router.put('/unfollow/:id',authMiddleWare,unfollow)
router.get('/friends',authMiddleWare,getFriends)
router.get('/findfriends', findFriends)
export default router;