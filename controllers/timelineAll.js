import Post from '../models/post.js';
import User from "../models/user.js";

const timelineAll = async(req, res) => {
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
  }

  export default timelineAll;