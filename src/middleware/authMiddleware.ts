import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Use environment variables for production

interface JwtPayload {
    id: number;
    role: 'user' | 'admin';
  }
  
  interface CustomRequest extends Request {
    user?: JwtPayload;
  }
  


export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {


  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token){
        throw new Error('Access denied')
      };

    const decoded = jwt.verify(token, JWT_SECRET);
    req.body = decoded;
    next();
  } catch (error) {
   res.status(400).send('Invalid token');
  }
};
