import mongoose from "mongoose";
import express from "express";
const app = express();

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kesuion:auth-08-finished@cluster0.2dtoywh.mongodb.net/speaker_app?retryWrites=true"
    );
    app.listen(8000);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// export default connectDb
