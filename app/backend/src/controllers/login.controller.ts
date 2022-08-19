import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';

export default class LoginController {
  constructor(private loginService: ILogin) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginSuccessfully = await this.loginService.login(email, password);
    if (loginSuccessfully === 'Incorrect email or password') {
      return res.status(401).json({ message: loginSuccessfully });
    }
    return res.status(200).json({ token: loginSuccessfully });
  }
}
