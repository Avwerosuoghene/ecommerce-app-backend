import { Router } from "express";
import validationHandler from "../../middleware/validationHandler";
import { authValidator } from "../../validations/authValidator";
import { AuthController } from "./authController";

const router = Router();

router.put("/auth/signup", authValidator.signup, validationHandler , AuthController.signup);

router.post("/auth/login", authValidator.login,validationHandler , AuthController.login);

router.put(
  "/auth/passwordReset",
  authValidator.passwordReset,
  validationHandler,
  AuthController.passwordReset
);

export default router;