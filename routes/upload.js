import cloudinary from 'cloudinary';
import { Router } from 'express';
import {CLOUD_NAME,CLOUD_KEY,CLOUD_SECRET} from '../config/config.js';
import authMiddleWare from '../middleWare/auth.js';
import path from 'path';
import multer from 'multer';
import post from '../models/post.js';
import url from 'url';
import User from '../models/user.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
});

const storage = multer.diskStorage({
    destination: `${path.join(__dirname,'/publicUpload/image')}`,
    fileFilter: (req, file, cb) => {
        try {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
              }else {
                throw new Error("check file type")
              }
        } catch (error) {
            cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }  
        },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        try {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
              }else {
                throw new Error("check file type")
              }
        } catch (error) {
            cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }  
        },
}).single('myFile');


const router = Router();
router.post('/post',authMiddleWare,async(req, res) => {
    try {
        const {description} = req.body;
        console.log()
        await upload(req, res,async(err) => {
            if(err) {
                res.send(err);
            } else {
                const data = await cloudinary.uploader.upload(req.file.path, (error, result) => {
                    if(error) {
                        res.send(error);
                    }
                });
                const postedBy = req.user._id;
                const postDescription = req.body.postDescription;
                const image = data.secure_url;
                const newPost = await new post({postedBy,postDescription,image});
                const savePost = await newPost.save();
            }
        });
    } catch (error) {
        res.status(500).json("error while uploading");
    }
    
});

router.put('/dp',authMiddleWare,async(req, res) => {
    try {
        await upload(req, res,async(err) => {
            if(err) {
                res.send(err);
            } else {
                const data = await cloudinary.uploader.upload(req.file.path, (error, result) => {
                    if(error) {
                        res.send(error);
                    }
                });
                const postedBy = req.user._id;
                const image = data.secure_url;
                const update = await User.updateOne({_id:postedBy},{dp:image});
            }
        });
    } catch (error) {
        res.status(500).json("error while uploading");
    }
    
});
router.put('/cover',authMiddleWare,async(req, res) => {
    try {
        await upload(req, res,async(err) => {
            if(err) {
                res.send(err);
            } else {
                const data = await cloudinary.uploader.upload(req.file.path, (error, result) => {
                    if(error) {
                        res.send(error);
                    }
                });
                const postedBy = req.user._id;
                const image = data.secure_url;
                const update = await User.updateOne({_id:postedBy},{coverPhoto:image});
            }
        });
    } catch (error) {
        res.status(500).json("error while uploading");
    }
    
});



export default router;
