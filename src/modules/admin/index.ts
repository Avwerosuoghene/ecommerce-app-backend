import { Router } from "express";
import { adminValidator } from "../../validations/adminValidators";
import { verifyToken } from "../../middleware/verifyToken";
import validationHandler from "../../middleware/validationHandler";
import { AdminController } from "./adminController";

const router = Router();

router.post(
  "/admin/products",
  verifyToken,
  adminValidator.postProduct,
  validationHandler,
  AdminController.postProduct
);
router.put(
  "/admin/product/:id",
  verifyToken,
  adminValidator.editProduct,
  validationHandler,
  AdminController.editProduct
);

router.get("/admin/currentUser", verifyToken, AdminController.getCurrentUser);

router.delete("/admin/product/:id", verifyToken, AdminController.deleteProduct);

router.put(
  "/admin/currentUser",
  verifyToken,
  adminValidator.updateUser,
  validationHandler,
  AdminController.updateUserProfile
);

router.post("/admin/createOrder", verifyToken, AdminController.createOrder)

export default router;
