import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import { ModError } from "../database/types/type";
import { configuration } from "../config/appconfig"
import {IConfigurables} from "../database/types/type"

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const jwtSecret = configuration[nodeEnv as keyof IConfigurables].mongoUrl




export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.get('Authorization')?.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(header!, jwtSecret)
    } catch (err: any) {
        err.statusCode = 500;
        err.message = "No token found";
        err.data = res;
        throw err;
    };

    if (!decodedToken) {
        const error = new ModError("Not authenticated");
        error.statusCode = 401;
        throw error;
    }

    next();
}