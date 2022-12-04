import { Router } from "express";
import Post from '../models/post.js';
const router = Router();

router.post('/', async(req,res)=>{
    const postFeed = await new Post(req.body);
    try{
        await postFeed.save();
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
  router.put("/like/:id", async (req, res) => {
    try {
      const postLike = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await postLike.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await postLike.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.findOne({ postedBy: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ postedBy: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;