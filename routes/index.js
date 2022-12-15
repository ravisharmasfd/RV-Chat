import { Router } from "express";
import authRoute from './auth.js';
import userRoute from "./user.js";
import postRoute from "./post.js";
import uploadRouter from './upload.js'
import personRouter from './person.js'


const router = Router();


router.use('/auth',authRoute);
router.use('/user',userRoute);
router.use("/post", postRoute);
router.use('/upload',uploadRouter);
router.use('/person',personRouter);

export default router;