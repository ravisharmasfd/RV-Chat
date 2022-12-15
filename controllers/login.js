import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/config.js";
const loginController = async(req,res)=>{
    const {email,password} = req.body;
    const userExist = await User.findOne({email},{__v:0});
    if(userExist){
        const match = await bcrypt.compare(password, userExist.password);
        if(match){
            const payLoad = {
                userName : userExist.userName,
                _id : userExist._id,
                email : userExist.email
              }
              delete userExist.password;
              const token = jwt.sign(payLoad, JWT_SECRET);
              res.json({ message: "All Ok", token, user:userExist});
        }else{
            res.status(401).json({msg : "check your details"})
        }
    }else{
        res.status(400).json({msg: "check your details"})
    }
}
export default loginController;