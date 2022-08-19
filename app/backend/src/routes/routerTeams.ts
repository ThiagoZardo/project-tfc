import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const routerTeams = Router();

routerTeams.get('/', (req, res) => teamsController.listAll(req, res));

export default routerTeams;
