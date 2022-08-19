import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const routerMatches = Router();

// routerMatches.get('/search', (req, res) => matchesController.searchMatches(req, res));
routerMatches.get('/', (req, res) => matchesController.listAll(req, res));

export default routerMatches;
