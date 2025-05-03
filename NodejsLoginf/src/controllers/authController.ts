import { NextFunction, Request, Response,RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = 'your-secret-key'; // Use environment variables for production

// Register
export const Register : RequestHandler = async (req: Request, res: Response) => {
  const {name, email, password, role } = req.body;
  
  try {
    if (!name || !email || !password || !role) {
     res.status(400).json({ message: 'All fields are required' });
     return;
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({name, email, password: hashedPassword, role });
    res.status(201).send('User registered');
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Registration failed' });

  }
};

// Login
export const Login: RequestHandler = async (req: Request, res: Response) => {
  const {email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user){
        res.status(400).json({ message: 'Invalid email or password' });
        return;
      }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
        {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role });
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
