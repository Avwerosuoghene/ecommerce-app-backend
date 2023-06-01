import { Request, Response, NextFunction } from "express";
import { ModError } from "../../database/types/handlers";
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
  
  
      try {
        const {message, id, token, userType} = await AuthService.login(req.body);
        const loginData = {token, id, userType}
        return succesHandler(res, 200, message, loginData, true)
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
    }
  
    static async passwordReset(req: Request, res: Response, next: NextFunction) {
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;
  
      if (password !== confirmPassword) {
        const error = new ModError("Password mismatch");
        error.statusCode = 422;
        return next(error);
      }
  
      
  
      try {
        const {message, id } = await AuthService.passwordReset(req.body)
        
        return succesHandler(res, 200, message, id, true)
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        return next(err);
      }
    }


  }