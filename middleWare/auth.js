import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js';

const authMiddleWare = async(req,res,next)=>{
    const {authorization} = req.headers;
    if(authorization){
        try {
            const authorHead = authorization.split(" ");
            if(authorHead[0] !== 'Bearer'){
                res.status(401).json({msg:"You are not authorize"});
                return;
            }
            const token = authorHead[1];
            const {_id} = await jwt.verify(token,JWT_SECRET);

            const user = await User.findOne({_id},{password:0,__v:0});

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({msg:"You are not authorize"});
        }
    }else{
        res.status(401).json({msg:"You are not authorize"})
    }
}
export default authMiddleWare;