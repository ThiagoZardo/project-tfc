import bcrypt = require('bcryptjs');
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  console.log('ANTES DO HASH', password);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  console.log('DEPOIS DO HASH', hash);
  const passwordHash = bcrypt.compareSync(password, hash);
  console.log('TRUE OU FALSE', passwordHash);

  if (passwordHash === true) next();
  return res.status(404).json({ message: 'Deu ruim aqui' });
};

export default {
  verifyToken,
};
