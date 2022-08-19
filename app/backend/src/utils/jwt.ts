import * as jwt from 'jsonwebtoken';
import { UserPasswordHiden } from '../interfaces/ILogin';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export const verifyToken = (token: string) => {
  const validate = jwt.verify(token, JWT_SECRET);
  return validate;
};

export const generateToken = async (user: UserPasswordHiden) => {
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '12h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ user }, JWT_SECRET, jwtConfig);
  return token;
};
