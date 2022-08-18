import Sinon, * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import Example from '../database/models/ExampleModel';
// import { Response } from 'superagent';
import { Ilogin } from '../interfaces/Ilogin';
import Login from '../database/models/login.model'

chai.use(chaiHttp);

const { expect } = chai;

const userUnauthorized: Ilogin = {
  email: "usuarionaocadastrado",
  password: "123456"
}

const userAuthorized: Ilogin = {
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
}

describe('Login', () => {
  it('1. Caso usuário não esteja cadastrado retorna não autorizado', async () => {
    Sinon.stub(Login, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send(userUnauthorized);
    expect(response.status).to.be.eq(404);
    Sinon.restore();
  });
  it('1. Caso usuário não esteja cadastrado retorna não autorizado', async () => {
    Sinon.stub(Login, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send(userAuthorized);
    expect(response.status).to.be.eq(200);
    Sinon.restore();
  });
});
