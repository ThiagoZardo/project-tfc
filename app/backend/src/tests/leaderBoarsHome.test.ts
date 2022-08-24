import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import Matches from '../database/models/matches.model';

chai.use(chaiHttp);
const { expect } = chai;

const mockMatches = {
  id: 1,
  homeTeam: 4,
  homeTeamGoals: 7,
  awayTeam: 14,
  awayTeamGoals: 1,
  inProgress: true,
}

describe('Testes LeaderBoars Home', () => {
  it('1. Verifica se retorna a classificação dos times da casa', async () => {
    const response = await chai.request(app).get('/leaderboard/home')
    expect(response.status).to.equal(200);
  })
})

describe('Testes LeaderBoars AlwayTeams', () => {
  it('1. Verifica se retorna a classificação dos times da casa', async () => {
    const response = await chai.request(app).get('/leaderboard/away')
    expect(response.status).to.equal(200);
  })
})

describe('Testes LeaderBoars AllTeams', () => {
  it('1. Verifica se retorna a classificação dos times da casa', async () => {
    const response = await chai.request(app).get('/leaderboard')
    expect(response.status).to.equal(200);
  })
})