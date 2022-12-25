import Post from '../models/post.js';

const getPostById = async (req, res) => {
    const _id = req.params.id;
    try {
      const post = await Post.find({postedBy:_id});
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  export default getPostById;