import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import fs from "fs";


import modules from "./modules";
import headerSetter from "./middleware/setHeaders";
import { connectDb } from "./database/db";
import multer from "multer";
import { CustomError } from "./database/types/handlers";
import { fstat } from "fs";

const app = express();



app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "../images")));

app.use(headerSetter);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
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
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),{flags: 'a'}
);
app.use(helmet());
app.use(compression());
app.use(morgan("combined", {stream: accessLogStream}));

app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    // console.log(error)
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data, isSuccess: false });
  }
);

connectDb();

// app.listen(port);

export default app;
