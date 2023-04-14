

import { Request, Response } from 'express';

export const succesHandler = (res: Response, statusCode: number, message: string, data: any, isSuccess: boolean) => {
  return res.status(statusCode).json({ message, data, isSuccess});
};
