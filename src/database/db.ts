import mongoose from "mongoose";
import { configuration } from "../config/appconfig";
import dotenv from "dotenv";
import { IConfigurables } from "./types/models";

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const mongodbURI = configuration[nodeEnv as keyof IConfigurables].mongoUrl




export const connectDb = (async () => {

    try {
      await mongoose.connect(
        mongodbURI
      );
      console.log('Mongo db connected' );
        
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  })

// export default functionCall
