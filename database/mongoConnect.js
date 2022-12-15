import mongoose from "mongoose";
import { MONGO_PASS, MONGO_USERNAME } from "../config/config.js";
export const databaseConnect = async()=>{
    const mongoPass = MONGO_PASS;
    const userName = MONGO_USERNAME;
    await mongoose.connect(
        `mongodb+srv://${userName}:${mongoPass}@rvchat.aeob5dz.mongodb.net/?retryWrites=true&w=majority`
      );
}
export const db = mongoose.Connection;