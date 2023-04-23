import { Request, Response, NextFunction } from "express";
import { succesHandler } from "../../helpers/responseHandler";
import { AdminService } from "./adminService";

export class AdminController {
  static postProduct(req: Request, res: Response, next: NextFunction) {
    (async () => {

      try {
        const featuresArray = JSON.parse(req.body.features)
        const { message, id } = await AdminService.postProduct(
          req.body,
          req!.file,
          req.currentUser,
          featuresArray
        );
        return succesHandler(res, 201, message, id, true);
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        next(err);
      }
    })();
  }

  static getProducts(req: Request, res: Response, next: NextFunction) {
  (  async() => {
      try {
        const {message, isSuccess, data} = await AdminService.getProducts();
        return succesHandler(res, 200, message, data, isSuccess);
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        next(err);
      }
    })();
  }
}
