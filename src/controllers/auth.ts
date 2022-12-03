import { Request, Response, NextFunction } from "express";
import { CustomError, ModError, UserI } from "../database/types/type";
import { validationResult } from "express-validator";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../database/models";
import { comparePassword, hashPassword } from "../helpers/auth";


export class AuthController {
  static signup(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ModError("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    (async () => {
      try {
        const hashedPw = await hashPassword(password, 12);
        const user = new User({
          email: email,
          password: hashedPw,
          name: name,
        });
        const result = await user.save();
        res
          .status(201)
          .json({ message: "user created succesfullly", userId: result._id });
      } catch (err: any) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }

        next(err);
      }
    })();
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ModError("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        const error = new ModError("User not found");
        error.statusCode = 401;
        throw error;
      }
      const passwordMatch = await comparePassword(password,user.password )
      if (!passwordMatch) {
        const error = new ModError("Passwords do not match");
        error.statusCode = 401;
        throw error;
      }
      res
        .status(200)
        .json({ message: "fetched succesfully", userId: user._id });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }

  static async passwordReset(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ModError("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new ModError("Password mismatch");
      error.statusCode = 422;
      throw error;
    }

    

    try {
      const hashedPw = await bcrypt.hash(password, 12);
      const user = User.findOne({ email: email });

      if (!user) {
        const error = new ModError("User not found");
        error.statusCode = 401;
        throw error;
      }
      const modifiedUser : UserI | null = await User.findOneAndUpdate(
        { email: email },
        { password: hashedPw },
        { new: true }
      );
      console.log(typeof modifiedUser)
      res
      .status(200)
      .json({ message: "password reset succesfully", userId: modifiedUser?._id });
    } catch (err: any) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }
}
