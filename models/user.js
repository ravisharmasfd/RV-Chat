import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    userName:{
        type: String,
        unique: true,
        require: true,
        min: 5,
        max: 25,
    },
    firstName:{
        type: String,
        require: true,
        min: 5,
        max: 25,
    },
    lastName:{
        type: String,
        required: true,
        min: 5,
        max: 25,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        min: 5,
    },
    dp:{
        type: String,
        default: ""
    },
    coverPhoto:{
        type: String,
        default: ""
    },
    followers:{type: Array,
        required: true,
        default: []
    },
    following:{type: Array,
        required: true,
        default: []
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    city:{
        type:String,
        max:50,
        default: ""
    },
    from:{
        type:String,
        max:50,
        default: ""
    },
    description:{
        type:String,
        default:"I am using RV Chat for connecting to world ",
        max:150,
        min: 10,
    },
    gender:{
        type:Number,
        enum : [1,2,3,4],
        default : 4,
    },
    relation:{
        type:Number,
        enum : [1,2,3,4],
        default : 4,
    },
},{timestamp:true});
export default new mongoose.model("User", UserSchema);