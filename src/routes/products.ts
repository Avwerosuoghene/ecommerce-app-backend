import express from 'express';
import { body } from "express-validator";

const router = express.Router();

router.get('/products', (req,res,next) => {
    res.status(200).json({
        message: 'api works'
    })
}) 

export default router


