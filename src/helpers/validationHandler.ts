import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ModError } from "../database/types/type";

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ModError("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
}

export default validationHandler;