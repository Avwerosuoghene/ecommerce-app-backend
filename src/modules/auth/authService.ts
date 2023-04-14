import  jwt  from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../../database/models";
import { isLoginIsSuccessI, isSuccessI, logingPayload, ModError, resetPassPayload, signUpPayload, UserI } from "../../database/types/type";
import { comparePassword, hashPassword } from "../../helpers/auth";
import { configuration } from "../../config/appconfig";
import dotenv from "dotenv";
import {IConfigurables} from "../../database/types/type"
import e from "express";

dotenv.config();

const nodeEnv = process.env.NODE_ENV!;
const nodeMailerEmail = configuration[nodeEnv as keyof IConfigurables]. nodemailer_mail;
const nodeMailerPass = configuration[nodeEnv as keyof IConfigurables].nodemailer_pass;
const jwtSecret = configuration[nodeEnv as keyof IConfigurables].jwtSecret;

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: nodeMailerEmail,
      pass: nodeMailerPass,
    },
  });

export class AuthService {
     static async signUp   (signupPayload: signUpPayload): Promise<isSuccessI>  {
        const {email, password, name, userType} = signupPayload
        const hashedPw = await hashPassword(password, 12);
        let reqUserType;

        if (userType) {
          reqUserType = userType
        } else {
          reqUserType = 'buyer'
        }
        const user = new User({
            email: email,
            password: hashedPw,
            name: name,
            userType : reqUserType
          });
          const result = await user.save();
    
          return {
            message: "User created succesfully",
            id: result._id,
            isSuccess: true,
          }
    };

    static async login (loginPayload: logingPayload): Promise<isLoginIsSuccessI>  {
        const {email, password} = loginPayload
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

        const token = jwt.sign({email: email, id: user._id.toString()},jwtSecret, {expiresIn: '30min'})
        

        return {
            message: "Login succesful",
            id: user._id,
            isSuccess: true,
            token: token,
            userType: user.userType
          }
    };

    static async passwordReset (resetPassPayload: resetPassPayload): Promise<isSuccessI >  {

        const {email, password} = resetPassPayload;
        const hashedPw = await hashPassword(password, 12);
        const user = await User.findOne({ email: email });
  
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


        transporter.sendMail(
            {
              from: nodeMailerEmail,
              to: email,
              subject: "Password reset",
              html: `
          <p>Password reset succesful</p> `,
            },
            function (error, info) {
              if (error) {
                console.log(error);
                throw error
              } else {
                console.log("Email sent: " + info.response);
              }
            }
          );

        return {
            message: "Password reset succesful",
            id: modifiedUser!._id,
            isSuccess: true,
        }
    }
}
    


 