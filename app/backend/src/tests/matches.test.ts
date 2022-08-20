import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams.model';
import ITeams from '../interfaces/ITeams';

import { Response } from 'superagent';
import Matches from '../database/models/matches.model';
import { IMatchesTest } from './interfaces/IMatchesTest';

chai.use(chaiHttp);
const { expect } = chai;

const mockMatches: IMatchesTest = {
  id: 1,
  homeTeam: 4,
  homeTeamGoals: 7,
  awayTeam: 14,
  awayTeamGoals: 1,
  inProgress: true,
}

const sedNewMatche = {
  homeTeam: 4,
  awayTeam: 14,
  homeTeamGoals: 7,
  awayTeamGoals: 1,
}

describe('Tests Matches', () => {
  it('1. A rota "/matches" deve retornar o status 200.)', async () => {
    Sinon.stub(Matches, 'findAll').resolves([mockMatches as Matches])
    const response = await chai.request(app).get('/matches')
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([mockMatches])
    Sinon.restore();
  });

  it('2. A rota "/matches?inProgress=true" deve retornar as partidas em andamento)', async () => {
    Sinon.stub(Matches, 'findAll').resolves([mockMatches as Matches])
    const response = await chai.request(app).get('/matches?inProgress=true')
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([mockMatches])
    Sinon.restore();
  });

  it('3. Faça um POST para a rota "/matches" para criar uma nova partida)', async () => {
    Sinon.stub(Matches, 'create').resolves(mockMatches as Matches)
    const response = await chai.request(app).post('/matches').send(sedNewMatche)
    expect(response.body).to.be.deep.equal(mockMatches)
    Sinon.restore();
  });

});