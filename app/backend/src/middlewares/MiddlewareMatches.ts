import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    const verify = verifyToken(token);
    if (verify) {
      res.locals.user = verify;
      return next();
    }
  }
  return res.status(401).json({ message: 'Token must be a valid token' });
};

export default validateToken;
