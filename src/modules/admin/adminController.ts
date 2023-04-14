import { Request, Response, NextFunction } from "express";
import { succesHandler } from "../../helpers/responseHandler";
import { AdminService } from "./adminService";


export class AdminController {
    static postProduct(req: Request, res: Response, next: NextFunction) {
  
      (async () => {
        try {
         
         const {message, id} = await  AdminService.postProduct(req.body);
         return succesHandler(res, 201, message, id, true);

        } catch (err: any) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
  
          next(err);
        }
      })();
    }
  }