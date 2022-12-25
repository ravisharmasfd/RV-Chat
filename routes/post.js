import { Router } from "express";
import {timelineAll,likePost,deletePost,getPostById} from '../controllers/index.js'
import authMiddleWare from "../middleWare/auth.js";
const router = Router();


  router.delete("/:id", authMiddleWare, deletePost);
  router.put("/like/:id",authMiddleWare, likePost );
  router.get("/:id", getPostById);
  router.get("/timeline/all",authMiddleWare ,timelineAll);

export default router;