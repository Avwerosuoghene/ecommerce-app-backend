import { Request, Response, NextFunction } from "express";
import { User } from "../../database/models";
import { ModError, UserI } from "../../database/types/type";
import { comparePassword, hashPassword } from "../../helpers/auth";
import { succesHandler } from "../../helpers/responseHandler";
import { AuthService } from "./authService";

export class AuthController {
    static signup(req: Request, res: Response, next: NextFunction) {
  
      (async () => {
        try {
         
         const {message, id} = await  AuthService.signUp(req.body);
         return succesHandler(res, 201, message, id, true);

        } catch (err: any) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
  
          next(err);
        }
      })();
    }
  
    static async login(req: Request, res: Response, next: NextFunction) {
      const email = req.body.email;
      const password = req.body.password;
  
  
      try {
        const {message, id, token} = await AuthService.login(req.body);
        const loginData = {token: token, id: id}
        return succesHandler(res, 200, message, loginData, true)
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
    }
  
    static async passwordReset(req: Request, res: Response, next: NextFunction) {
      const email = req.body.email;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
  
      if (password !== confirmPassword) {
        const error = new ModError("Password mismatch");
        error.statusCode = 422;
        throw error;
      }
  
      
  
      try {
        const {message, id, isSuccess } = await AuthService.passwordReset(req.body)
        
        // res
        // .status(200)
        // .json({ message: message, userId: id, isSuccess: isSuccess});
        return succesHandler(res, 200, message, id, true)
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
    }
  }