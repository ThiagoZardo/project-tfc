import bcrypt = require('bcryptjs');
import LoginModel from '../database/models/login.model';
import ILogin from '../interfaces/ILogin';
import { generateToken } from '../utils/jwt';

export default class LoginService implements ILogin {
  constructor(private loginModel = LoginModel) {}
  async login(email: string, password: string): Promise<string> {
    const emailUser = await this.loginModel.findOne({ where: { email } });
    if (emailUser && bcrypt.compareSync(password, emailUser.password) === true) {
      const { id, username, role } = emailUser;
      const user = {
        id,
        username,
        role,
        email,
      };
      const token = await generateToken(user);
      return token;
    }
    return 'Incorrect email or password';
  }
}
