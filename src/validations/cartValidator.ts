import { body } from "express-validator";
import { cartI } from "../database/types/models";

export const cartValidator = {
   addToCart: [
    body("cart")
    .notEmpty()
    .bail()
    .withMessage("Cart cannot be empty")
    .custom((cart, { req }) => {
        const cartArray = cart;

        if (!cart || cart.length <= 0) {
          throw new Error("Invalid cart array");
        }
        const isValid = cartArray.every((cartItem: cartI) => {
            return cartItem.product && cartItem.quantity
        })
        if (!isValid) {
          throw new Error("Invalid cart array");
        }
        return true;
      }),
   ] ,
   removeFromCart: [
    body('id').not().isEmpty().withMessage("Id cannot be empty")
   ]
}