

import { Request, Response } from 'express';

export const succesHandler = (res: Response, statusCode: number, message: string, data: any) => {
  return res.status(200).json({ message, data});
};
