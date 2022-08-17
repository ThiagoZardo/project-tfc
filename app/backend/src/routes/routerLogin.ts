import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const routerLogin = Router();

routerLogin.post('/', LoginController.login);

export default routerLogin;
