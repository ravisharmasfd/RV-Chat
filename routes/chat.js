import express from "express";
import authMiddleWare from "../middleWare/auth.js";
import {createChat,getChat,findChat} from '../controllers/index.js';
const router = express.Router();

router.post('/',authMiddleWare,createChat)
router.get('/',authMiddleWare, getChat);
router.get('/find/:id', findChat);

export default router;