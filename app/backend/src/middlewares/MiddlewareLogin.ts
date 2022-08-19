import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    role: string;
  }
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export const validateToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (token) {
    const verify = verifyToken(token);
    res.locals.user = verify;
    const { user } = res.locals.user;
    const { role } = user;
    console.log(role);
    return res.status(200).json({ role });
  }
  return res.status(401).json({ message: 'Token not found' });
};
