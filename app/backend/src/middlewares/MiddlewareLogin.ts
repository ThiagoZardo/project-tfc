import { Request, Response, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default validateLogin;
