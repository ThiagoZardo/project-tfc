import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import Login from '../database/models/login.model'
import ILogin from '../interfaces/ILogin';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;


const dataValues = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

describe('Tests Login', () => {
  it('1. Caso usuário não esteja cadastrado retorna não autorizado', async () => {
    const userUnauthorized = {
      email: "usuario@naocadastrado.com",
      password: "123456"
    }    
    Sinon.stub(Login, 'findOne').resolves(null)
    const response = await chai.request(app).post('/login').send(userUnauthorized);
    expect(response.status).to.be.eq(401);
    Sinon.restore();
  });

  it('2. Caso usuário esteja cadastrado retorna status 200', async () => {
    const userAuthorized = {
      email: "admin@admin.com",
      password: "secret_admin"
    }
    const response = await chai.request(app).post('/login').send(userAuthorized);
    expect(response.status).to.be.eq(200);
    Sinon.restore();
  });

  it('3. Valida se o email esta no formato correto', async () => {
    const userUnauthorized = {
      email: "qualquercoisa",
      password: "secret_admin"
    }
    const response = await chai.request(app).post('/login').send(userUnauthorized);
    expect(response.status).to.be.eq(200);
  })
});
