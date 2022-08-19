import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Login from '../database/models/login.model'

chai.use(chaiHttp);
const { expect } = chai;

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

  it('3. Caso email não esteja no formato correto retorna status 401', async () => {
    const userUnauthorized = {
      email: "qualquercoisa",
      password: "secret_admin"
    }
    const response = await chai.request(app).post('/login').send(userUnauthorized);
    expect(response.status).to.be.eq(401);
  })
});
