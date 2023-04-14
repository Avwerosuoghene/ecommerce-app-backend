import { body } from "express-validator";
import { Product } from "../database/models";

export const adminValidator = {
  postProduct: [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("title must be at least 5 characters"),
    body("price")
      .not()
      .isEmpty()
      .bail()
      .isFloat()
      .withMessage("price must be a float number"),
    body("category")
      .trim()
      .not()
      .isEmpty()
      .withMessage("category must not be empty"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("description must be at least 5 characters"),
    body("features")
      .isArray()
      .bail()
      .withMessage("features must be an array")
      .notEmpty()
      .bail()
      .withMessage("features cannot be empty")
      .custom((features, { req }) => {
        const isValid = features.every((feature: {name: string, quantity: Number}) => {
            return feature.name && feature.quantity
        })
        if (!isValid) {
          throw new Error("Invalid features array");
        }
        return true;
      }),
    body("imageUrl").not().isEmpty().withMessage("ImageUrl cannot be empty"),
    body("userId").not().isEmpty().withMessage("UserId cannot be empty")
  ],
};
