import { Router } from "express";
import authMiddleWare from "../middleWare/auth.js";
import Post from '../models/post.js';
import User from "../models/user.js";
const router = Router();

router.post('/',authMiddleWare, async(req,res)=>{
    const postFeed = await new Post(req.body);
    try{
        const {postedBy,postDescription} = req.body;
        if(req.user.email !== req.posterB){
          res.status(401).json({msg:"you are not authorize"});
        }
        
        res.json({msg:'new post uploaded'})
    }
    catch(err){
        res.status(500).json({msg: "server error"})
    }
})

router.put("/:id", async (req, res) => {
    try {
      const postUpdate = await Post.findById(req.params.id);
      if (postUpdate.postedBy === req.body.userId) {
        await postUpdate.updateOne({ $set: req.body });
        res.status(200).json({msg: " updated a post successfully"});
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const postUpdate = await Post.findById(req.params.id);
      if (postUpdate.postedBy === req.body.userId) {
        await postUpdate.deleteOne();
        res.status(200).json({msg: " deleted a post successfully"});
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put("/like/:id",authMiddleWare, async (req, res) => {
    try {
      const postData = await Post.findById(req.params.id);
      if (!postData.likes.includes(req.user._id)) {
        await postData.updateOne({ $push: { likes: req.user._id } });
        res.status(200).json("The post has been liked");
      } else {
        await postData.updateOne({ $pull: { likes: req.user._id } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const post = await Post.find({postedBy:_id});
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/timeline/all",authMiddleWare ,async(req, res) => {
    try {
      const currentUser = req.user;
      const userPosts = await Post.find({ postedBy: currentUser._id });
      const friendPosts = await Post.find({ postedBy: {$in : currentUser.following} })
      let data =  userPosts.concat(friendPosts)
      const m = new Map();
      for(let i = 0 ; i<data.length ; i++){
        const postedBy = data[i].postedBy;
        const id = postedBy.toString();
        if(!m.has(id)){
          const user = await User.findOne({_id:postedBy},{firstName:1,lastName:1,dp:1,userName:1,_id:1});
          m.set(id,user);
        }
      }
      const dataUser = [];
      for(let i = 0 ; i<data.length ; i++){
        const postedBy = data[i].postedBy;
        const id = postedBy.toString();
        const userData = m.get(id);
        const d = {
          postData : data[i],
          userData
        }
        dataUser.push(d);

      }
      res.json({dataUser})
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;