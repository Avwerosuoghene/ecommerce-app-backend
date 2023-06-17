import { Request, Response, NextFunction } from "express";
import { ModError } from "../../database/types/handlers";
import { succesHandler } from "../../helpers/responseHandler";
import { CartService } from "./cartService";

export class CartController {
  static getCart(req: Request, res: Response, next: NextFunction) {
    (async () => {
      try {
        const { message, cart, total } = await CartService.fetchCart(req.currentUser);
        return succesHandler(res, 200, message, true, {cart, total});
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
        const { message, id,isSuccess, } = await CartService.addToCart(
          req.currentUser,
          req.body
        );
        return succesHandler(res, 201, message, isSuccess, id);
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
        const { message, id } = await CartService.removeFromCart(
          req.currentUser,
          req.params.id
        );
        return succesHandler(res, 201, message, true, id);
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        next(err);
      }
    })();
  }

  static clearCart(req: Request, res: Response, next: NextFunction) {
    (async () => {
      try {
        const { message, id } = await CartService.clearFromCart(
          req.currentUser
        );
        return succesHandler(res, 201, message, true, id);
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        next(err);
      }
    })();
  }
}
