import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginSuccessfully = await LoginService.login(email, password);
    if (!loginSuccessfully) return res.status(404).json({ message: 'User Unauthorized' });
    res.status(200).json({ loginSuccessfully });
  };
}

export default LoginController;
