import express from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoConnect from './database/mongoConnect.js'
import authRoute from './routes/auth.js'
import userRoute from "./routes/user.js"
import postRoute from "./routes/post.js"
import cors from 'cors'

dotenv.config();
const port = process.env.PORT || 5000;
mongoConnect();
console.log("connected to mongo successfully");

const app = express();

app.use(morgan('combined'));
app.use(cors())
app.use(helmet());
app.use(express.json())
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use("/post", postRoute);



app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
