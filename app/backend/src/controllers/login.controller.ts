import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginSuccessfully = await LoginService.login(email, password);
    res.status(StatusCodes.OK).json({ loginSuccessfully });
  };
}

export default LoginController;
