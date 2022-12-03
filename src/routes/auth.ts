import { Router } from "express";
import { body } from "express-validator";

import { AuthController } from "../controllers/auth";
import { User } from "../database/models";
import { authValidator } from "../validations/authValidator";

const router = Router();

router.put("/signup", authValidator.signup, AuthController.signup);

router.post("/login", authValidator.login, AuthController.login);

router.put(
  "/passwordReset",
  authValidator.passwordReset,
  AuthController.passwordReset
);

export default router;
