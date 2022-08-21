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
import { generateToken } from '../utils/jwt';
 
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

const user = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
}

describe('Tests Matches', () => {
  it('1. A rota "/matches" deve retornar o status 200.', async () => {
    Sinon.stub(Matches, 'findAll').resolves([mockMatches as Matches])
    const response = await chai.request(app).get('/matches')
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([mockMatches])
    Sinon.restore();
  });

  it('2. A rota "/matches?inProgress=true" deve retornar as partidas em andamento.', async () => {
    Sinon.stub(Matches, 'findAll').resolves([mockMatches as Matches])
    const response = await chai.request(app).get('/matches?inProgress=true')
    expect(response.status).to.equal(200);
    expect(response.body).to.be.deep.equal([mockMatches])
    Sinon.restore();
  });

  it('3. Faça um POST para a rota "/matches" para criar uma nova partida.', async () => {
    Sinon.stub(Matches, 'create').resolves(mockMatches as Matches)
    const token = await generateToken(user);  
    const response = await chai.request(app).post('/matches').set('Authorization', `${token}`).send(sedNewMatche)
    expect(response.body).to.be.deep.equal(mockMatches)
    Sinon.restore();
  });

  it('4. Não deve ser possivel criar uma partida com 2 times iguais.', async () => {
    const equalsTeams = {
      homeTeam: 4,
      awayTeam: 4,
      homeTeamGoals: 7,
      awayTeamGoals: 1,
    }
    const token = await generateToken(user);   
    const response = await chai.request(app).post('/matches').set('Authorization', `${token}`).send(equalsTeams)
    expect(response.status).to.be.equal(401)
  });

  it('5. Não deve ser possivel criar uma partida com times inesistentes no banco de dados.', async () => {
    const nonexistentTeams = {
      homeTeam: 0,
      awayTeam: 999,
      homeTeamGoals: 7,
      awayTeamGoals: 1,
    }
    const token = await generateToken(user);   
    const response = await chai.request(app).post('/matches').set('Authorization', `${token}`).send(nonexistentTeams)
    expect(response.status).to.be.equal(404)
  });

  it('6. Deve ser possivel atualizar uma partida a cada gol que surge.', async () => {
    const token = await generateToken(user);
    const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', `${token}`).send(sedNewMatche)
    expect(response.status).to.be.equal(200)
  });

  it('7. Deve ser possivel atualizar uma partida a cada gol que surge.', async () => {
    const upDatedMatch = {
      homeTeamGoals: 3,
      awayTeamGoals: 1
    }
    const token = await generateToken(user);
    const response = await chai.request(app).patch('/matches/1').set('Authorization', `${token}`).send(upDatedMatch)
    expect(response.status).to.be.equal(200)
  });

});