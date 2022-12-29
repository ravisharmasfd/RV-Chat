import User from '../models/user.js';


const updateUser =async(req,res)=>{
    try{
        const {firstName,lastName,description,gender ,city,from,relation} = req.body;
        if(firstName && lastName && description && gender && city && from && relation){
            const updateUser = await User.findByIdAndUpdate(req.user._id,{
                $set : req.body,
            });
            const us = await User.findOne({_id:req.user._id},{password:0,__v:0,isAdmin:0,updatedAt:0});
            res.status(200).json({msg:"updated successfully.",data:us});
        }
        else req.status(400);
    }catch(err){res.status(500).json({err})}
} ;
export default updateUser;