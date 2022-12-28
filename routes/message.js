import express from 'express';
import { addMessage, getMessage } from '../controllers/index.js';
import authMiddleWare from '../middleWare/auth.js';

const router = express.Router();

router.post('/',authMiddleWare, addMessage);

router.get('/:chatId',authMiddleWare, getMessage);

export default router