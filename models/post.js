import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.ObjectId,
        required : true,
    },
    postDescription:{
        type : String,
        max: 200,
    },
    image:{
        type : String,
        unique : true,
    },
    likes:{
        type: Array,
        default: []
    }
},{ timestamps: true });
export default new mongoose.model("Post", PostSchema);