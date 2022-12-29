import Post from '../models/post.js';

const deletePost = async (req, res) => {
    try {
      const postUpdate = await Post.findById(req.params.id);
      
      if (postUpdate.postedBy.toString() === req.user._id.toString()) {
        console.log("first")
        await postUpdate.deleteOne({_id : req.params.id});
        res.status(200).json({msg: " deleted a post successfully"});
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  export default deletePost;