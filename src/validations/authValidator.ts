import { body } from "express-validator";
import { User } from "../database/models";

export const authValidator = {
  signup: [
    body("email").trim()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  login: [
    body("email").trim().isEmail().withMessage("Please enter a valid mail"),
    body("password", "Password has to be valid.")
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  passwordReset: [
    body("email").trim().isEmail().withMessage("Please enter a valid email."),
    body("password").trim().isLength({ min: 5 }),
  ],
};
