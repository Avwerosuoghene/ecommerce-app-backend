import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import { Request, Response, NextFunction } from "express";
import { configuration } from "../config/appconfig"
import { IConfigurables } from "../database/types/models";
import { ModError } from "../database/types/handlers";

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const jwtSecret = configuration[nodeEnv as keyof IConfigurables].jwtSecret




export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.get('Authorization')?.split(' ')[1];
    let decodedToken;
    if (!header) {
        const error = new ModError("No token found");
        error.statusCode = 500;
        return next(error);
    }
    try {

        decodedToken = jwt.verify(header!, jwtSecret) as JwtPayload
       
    } catch (err: any) {
 
        console.log(err)
        const error = new ModError("Not authenticated");
        error.statusCode = 401;
        
        return next(error);
    };

    if (!decodedToken) {
        const error = new ModError("Not authenticated");
        error.statusCode = 401;
        return next(error);
    }
    
    req.currentUser= {
        id: decodedToken.id,
        email: decodedToken.email
    };
    next();
}