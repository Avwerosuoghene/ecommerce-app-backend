import { Request, Response, NextFunction } from "express";
import { succesHandler } from "../../helpers/responseHandler";
import { ProductsService } from "./productsService";

export class ProductsController {
  static getProducts(req: Request, res: Response, next: NextFunction) {
    (async () => {
      try {
        const { message, isSuccess, data } =
          await ProductsService.getProducts();
        return succesHandler(res, 200, message, data, isSuccess);
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        next(err);
      }
    })();
  };

  static getProductById (req: Request, res: Response, next: NextFunction) {
    (async () =>  {
        try {
            const { message, isSuccess, data } =
            await ProductsService.getProductById(req.params.id);
          return succesHandler(res, 200, message, data, isSuccess);
        } catch(err: any) {
            if (!err.statusCode) {
                err.statusCode = 500;
              }
      
              next(err);
        }
    })();
  };

  static getProductsByUserId (req: Request, res: Response, next: NextFunction) {
    (async () =>  {
        try {
            const { message, isSuccess, data } =
            await ProductsService.getProductByUserId(req.query.userId);
          return succesHandler(res, 200, message, data, isSuccess);
        } catch(err: any) {
            if (!err.statusCode) {
                err.statusCode = 500;
              }
              next(err);
        }
    })(); 
  }
}
