import { body } from "express-validator";
import { Product } from "../database/models";

export const adminValidator = {
  postProduct: [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters"),
    body("price")
      .not()
      .isEmpty()
      .bail()
      .isFloat()
      .withMessage("price must be a float number"),
    body("featuresDescription")
    .trim()
    .isLength({ min: 3 })
    .withMessage("features description must be at least 3 characters"),
    body("category")
      .trim()
      .not()
      .isEmpty()
      .withMessage("category must not be empty"),
    body("description")
      .trim()
      .isLength({ min: 3 })
      .withMessage("description must be at least 3 characters"),
    body("features")
      .notEmpty()
      .bail()
      .withMessage("features cannot be empty")
      .custom((features, { req }) => {
        const featuresArray = JSON.parse(features);
        if (!features || features.length <= 0) {
          throw new Error("Invalid features array");
        }
        const isValid = featuresArray.every((feature: {name: string, quantity: Number}) => {
            return feature.name && feature.quantity
        })
        if (!isValid) {
          throw new Error("Invalid features array");
        }
        return true;
      }),
  
    body("userId").not().isEmpty().withMessage("UserId cannot be empty")
  ],

  editProduct: [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("title must be at least 3 characters"),
    body("price")
      .not()
      .isEmpty()
      .bail()
      .isFloat()
      .withMessage("price must be a float number"),
    body("featuresDescription")
    .trim()
    .isLength({ min: 3 })
    .withMessage("features description must be at least 3 characters"),
    body("category")
      .trim()
      .not()
      .isEmpty()
      .withMessage("category must not be empty"),
    body("description")
      .trim()
      .isLength({ min: 3 })
      .withMessage("description must be at least 3 characters"),
    body("features")
      .notEmpty()
      .bail()
      .withMessage("features cannot be empty")
      .custom((features, { req }) => {
        const featuresArray = JSON.parse(features);
        if (!features || features.length <= 0) {
          throw new Error("Invalid features array");
        }
        const isValid = featuresArray.every((feature: {name: string, quantity: Number}) => {
            return feature.name && feature.quantity
        })
        if (!isValid) {
          throw new Error("Invalid features array");
        }
        return true;
      })
  
  ]
};
