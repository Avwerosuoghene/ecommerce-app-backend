import { Router } from "express";
import validationHandler from "../../middleware/validationHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { cartValidator } from "../../validations/cartValidator";
import { CartController } from "./cartController";

const router = Router();

router.get("/cart",verifyToken,  CartController.getCart);
router.post("/cart",verifyToken, cartValidator.addToCart,validationHandler,  CartController.addToCart);
router.delete("/cart",verifyToken, cartValidator.removeFromCart,validationHandler,  CartController.removeFromCart);


export default router;