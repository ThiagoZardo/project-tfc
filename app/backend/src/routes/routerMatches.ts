import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import validateToken from '../middlewares/MiddlewareMatches';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const routerMatches = Router();

routerMatches.get('/', (req, res) => matchesController.listAll(req, res));
routerMatches.post('/', validateToken, (req, res) => matchesController.create(req, res));
routerMatches.patch(
  '/:id/finish',
  (req, res) => matchesController.matchInProgress(req, res),
);
routerMatches.patch('/:id', (req, res) => matchesController.matchUptade(req, res));
export default routerMatches;
