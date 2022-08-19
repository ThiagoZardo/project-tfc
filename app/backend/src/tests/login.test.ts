// import * as Sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// // import Example from '../database/models/ExampleModel';
// import Login from '../database/models/login.model'
// import ILogin from '../interfaces/ILogin';

// import { Response } from 'superagent';

// chai.use(chaiHttp);
// const { expect } = chai;


// const userUnauthorized: ILogin = {
//   email: "usuarionaocadastrado",
//   password: "123456"
// }

// const userAuthorized: ILogin = {
//   email: "user@user.com",
//   password: "secret_user"
// }

// describe('Login', () => {
//   it('1. Caso usuário não esteja cadastrado retorna não autorizado', async () => {
//     Sinon.stub(Login, 'findOne').resolves(null)
//     const response = await chai.request(app).post('/login').send(userUnauthorized);
//     expect(response.status).to.be.eq(404);
//     Sinon.restore();
//   });
//   it('1. Caso usuário não esteja cadastrado retorna não autorizado', async () => {
//     Sinon.stub(Login, 'findOne').resolves(null)
//     const response = await chai.request(app).post('/login').send(userAuthorized);
//     expect(response.status).to.be.eq(200);
//     Sinon.restore();
//   });
// });
