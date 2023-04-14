import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import session from 'express-session'


import { CustomError } from "./database/types/type";
import modules from "./modules";
import headerSetter from "./middleware/setHeaders";
import {connectDb} from "./database/db";
import multer from "multer";


const app = express();


app.use(bodyParser.json());

app.use(headerSetter);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req :Request, file: any, cb:any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);


modules(app);

app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}))


app.use((error:   CustomError, req: Request, res: Response, next: NextFunction) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data, isSuccess: false });
});

connectDb();

// app.listen(port);

export default app;

