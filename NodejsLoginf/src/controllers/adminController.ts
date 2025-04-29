import { Request, Response } from 'express';

// Admin page logic
export const getAdminPage = (req: Request, res: Response) => {
  res.status(200).send('Welcome Admin');
};
