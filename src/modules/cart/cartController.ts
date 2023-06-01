import { Request, Response, NextFunction } from "express";
import { ModError } from "../../database/types/handlers";
import { succesHandler } from "../../helpers/responseHandler";
import { CartService } from "./cartService";

export class CartController {
    static getCart(req: Request, res: Response, next: NextFunction) {
  
      (async () => {
        try {
         
         const {message, cart} = await  CartService.fetchCart(req.currentUser);
         return succesHandler(res, 200, message, cart, true);

        } catch (err: any) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
  
          next(err);
        }
      })();
    }

    static addToCart(req: Request, res: Response, next: NextFunction) {
  
      (async () => {
        try {
         
         const {message, id} = await  CartService.addToCart(req.currentUser,req.body.cart);
         return succesHandler(res, 201, message, id, true);

        } catch (err: any) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
  
          next(err);
        }
      })();
    }

    static removeFromCart(req: Request, res: Response, next: NextFunction) {
  
      (async () => {
        try {
         
         const {message, id} = await  CartService.removeFromCart(req.currentUser,req.body.id);
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