import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const verify = verifyToken(token);
      if (verify) {
        res.locals.user = verify;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
  return res.status(401).json({ message: 'Token must be a valid token' });
};

export default validateToken;
