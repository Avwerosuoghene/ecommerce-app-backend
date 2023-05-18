import dotenv from "dotenv";
import { IConfigurables } from "../database/types/models";

dotenv.config({ path: `${process.env.NODE_ENV}.env` });



export  const configuration : IConfigurables  = {
    dev: {
        mongoUrl: process.env.MONGO_URL_DEV!,
        jwtSecret: process.env.JWT_SECRET_DEV!,
        port: process.env.PORT_DEV!,
        nodemailer_mail: process.env.NODEMAILER_EMAIL_DEV!,
        nodemailer_pass: process.env.NODEMAILER_PASS_DEV!

    },
    prod: {
        mongoUrl: process.env.MONGO_URL_PROD!,
        jwtSecret: process.env.JWT_SECRET_DEV!,
        port: process.env.PORT_PROD!,
        nodemailer_mail: process.env.NODEMAILER_EMAIL_PROD!,
        nodemailer_pass: process.env.NODEMAILER_PASS_PROD!
    }
}