

import { Request, Response } from 'express';

export const succesHandler = (res: Response, statusCode: number, message: string, data: any, isSuccess: boolean) => {
  return res.status(200).json({ message, data, isSuccess});
};
