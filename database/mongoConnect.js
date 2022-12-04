import mongoose from "mongoose";
import * as dotenv from 'dotenv'


dotenv.config();
const databaseConnect = async()=>{
    const mongoPass = process.env.MONGO_PASS;
    const userName = process.env.MONGO_USERNAME;
    await mongoose.connect(
        `mongodb+srv://${userName}:${mongoPass}@rvchat.aeob5dz.mongodb.net/?retryWrites=true&w=majority`
      );
}
export default databaseConnect;