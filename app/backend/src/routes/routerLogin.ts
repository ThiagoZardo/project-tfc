import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';
import validateLogin from '../middlewares/MiddlewareLogin';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const routerLogin = Router();

routerLogin.post('/', validateLogin, (req, res) => loginController.login(req, res));

export default routerLogin;
