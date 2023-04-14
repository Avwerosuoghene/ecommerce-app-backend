import { Router } from "express";
import { adminValidator } from "../../validations/adminValidators";
import { verifyToken } from "../../middleware/verifyToken";
import validationHandler from "../../middleware/validationHandler";
import { AdminController } from "./adminController";

const router = Router();

router.post("/admin/products",verifyToken, adminValidator.postProduct,validationHandler,AdminController.postProduct  );

// router.post("/admin/products", authValidator.login, AuthController.login);





export default router;