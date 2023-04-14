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
    body("userType").trim().not().isEmpty().bail().custom((userType, {req}) => {
      
      if (userType !== 'seller' && userType !== 'buyer') {
        throw new Error("Invalid user type")
      }
      return true;
    })
  ],
  login: [
    body("email").trim().isEmail().withMessage("Please enter a valid mail"),
    body("password", "Password has to be valid.")
      .trim()
      .isLength({ min: 5 }),
  ],
  passwordReset: [
    body("email").trim().isEmail().withMessage("Please enter a valid email."),
    body("password").trim().isLength({ min: 5 }),
  ],
};
