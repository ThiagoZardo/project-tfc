import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams.model';
import ITeams from '../interfaces/ITeams';

import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

const teamsMock = {
  id: 1,
  teamName: 'any-team',
}

describe('Tests Teams', () => {
  it('1. A rota "/teams" deve retornar o status 200.)', async () => {
    Sinon.stub(Teams, 'findAll').resolves([teamsMock as Teams])
    const response = await chai.request(app).get('/teams')
    expect(response.status).to.equal(200)
    Sinon.restore();
  });

  it('1. A rota "/teams/:id" deve retornar o status 200.)', async () => {
    Sinon.stub(Teams, 'findAll').resolves([teamsMock as Teams])
    const response = await chai.request(app).get('/teams/1')
    expect(response.status).to.equal(200)
    Sinon.restore();
  });
});