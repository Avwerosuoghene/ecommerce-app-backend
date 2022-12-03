import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import { Request, Response, NextFunction } from 'express'

import productsRoutes from "./routes/products";
import authRoutes from "./routes/auth";
import { CustomError } from "./database/types/type";
import modules from "./modules";
import {connectDb} from "./database/db";

const app = express();

app.use(bodyParser.json());

app.use((req: any, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use("/auth", authRoutes);
// app.use("/cart", productsRoutes);

modules(app);

// app.use(
//   (error: any, req: Request, res: Response, next: NextFunction) => {

//     const status = error.statusCode || 500;
//     console.log(status)
//     const message = error.message;
//     const data = error.data;
//     res.status(status).json({ message: message, data: data });
//   }
// );

app.use((error:   CustomError, req: Request, res: Response, next: NextFunction) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

connectDb()

// mongoose
//   .connect(
//     "mongodb+srv://kesuion:auth-08-finished@cluster0.2dtoywh.mongodb.net/speaker_app?retryWrites=true"
//   )
//   .then((result) => {
//     app.listen(8000);
//   })
//   .catch((err) => {});

// (async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://kesuion:auth-08-finished@cluster0.2dtoywh.mongodb.net/speaker_app?retryWrites=true"
//     );
//     app.listen(8000);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// })();
