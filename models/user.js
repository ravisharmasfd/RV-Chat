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
        uppercase: true,
    },
    lastName:{
        type: String,
        required: true,
        min: 5,
        max: 25,
        uppercase: true,
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
        min: 8,
    },
    dp:{
        type: String,
        default: "https://res.cloudinary.com/do7ueuane/image/upload/v1670762552/defaultProfile_n4qw2w.jpg"
    },
    coverPhoto:{
        type: String,
        default: "https://res.cloudinary.com/do7ueuane/image/upload/v1670762758/gradient-7258997_cid5y2.png"
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
        default: "RV WORLD",
        min:2
    },
    from:{
        type:String,
        max:50,
        default: "RV WORLD",
        min:2
    },
    description:{
        type:String,
        default:"I am using RV Chat for connecting to the world ",
        max:150,
        min: 10,
    },
    gender:{
        type:String,
        enum : ["MALE",'FEMALE','OTHER','PRIVATE INFO'],
        default : 'PRIVATE INFO',
    },
    relation:{
        type:String,
        enum : ['SINGLE','MARRIED','COMMITTED','OTHER','PRIVATE INFO'],
        default : 'PRIVATE INFO',
    },
},{timestamps:true});
export default new mongoose.model("User", UserSchema);