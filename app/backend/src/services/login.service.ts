import LoginModel from '../database/models/login.model';

class LoginService {
  static async login(email: string, password: string) {
    const loginSuccessfully = await LoginModel.findOne({ where: { email, password } });
    return loginSuccessfully;
  }
}

export default LoginService;
