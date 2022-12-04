import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import session from 'express-session'


import { CustomError } from "./database/types/type";
import modules from "./modules";
import headerSetter from "./middleware/setHeaders";
import {connectDb} from "./database/db";


const app = express();


app.use(bodyParser.json());

app.use(headerSetter);


modules(app);

app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}))


app.use((error:   CustomError, req: Request, res: Response, next: NextFunction) => {

  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

connectDb();

// app.listen(port);

export default app;

