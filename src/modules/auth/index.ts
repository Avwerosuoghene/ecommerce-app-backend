import { Router } from "express";
import validationHandler from "../../helpers/validationHandler";
import { authValidator } from "../../validations/authValidator";
import { AuthController } from "./authController";

const router = Router();

router.put("/auth/signup", authValidator.signup, validationHandler , AuthController.signup);

router.post("/auth/login", authValidator.login, AuthController.login);

router.put(
  "/passwordReset",
  authValidator.passwordReset,
  AuthController.passwordReset
);

export default router;