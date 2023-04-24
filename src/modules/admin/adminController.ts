import { Request, Response, NextFunction } from "express";
import { succesHandler } from "../../helpers/responseHandler";
import { AdminService } from "./adminService";

export class AdminController {
  static postProduct(req: Request, res: Response, next: NextFunction) {
    (async () => {

      try {
        const featuresArray = JSON.parse(req.body.features);
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

  static editProduct(req: Request, res: Response, next: NextFunction) {
  (  async() => {
      try {
        const featuresArray = JSON.parse(req.body.features);
        const productId = req.params.id;
        const { message, id } = await AdminService.editProduct(
          req.body,
          req!.file,
          req.currentUser,
          featuresArray,
          productId
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

  static deleteProduct(req: Request, res: Response, next: NextFunction) {
    (  async() => {
        try {
          const productId = req.params.id;
          const { message, id } = await AdminService.deleteProduct(
            req.currentUser,
            productId
          );
          return succesHandler(res, 200, message, id, true);
        } catch (err: any) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
  
          next(err);
        }
      })();
    }
}
