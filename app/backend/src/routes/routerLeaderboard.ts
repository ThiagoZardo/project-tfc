import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';
import LeaderBoardHomeTeams from '../services/leaderBoardHome';
import LeaderBoardAwaysTeams from '../services/leaderBoardAways';
import LeaderBoardAllTeams from '../services/leaderBoardAllTeams';

const leaderTeamsHome = new LeaderBoardHomeTeams();
const leaderTeamsAway = new LeaderBoardAwaysTeams();
const leaderAllTeams = new LeaderBoardAllTeams();

const leaderBoardController = new
LeaderBoardController(leaderTeamsHome, leaderTeamsAway, leaderAllTeams);

const routerLeaderBoard = Router();

routerLeaderBoard.get('/home', (req, res) => leaderBoardController.listHomeTeams(req, res));
routerLeaderBoard.get('/away', (req, res) => leaderBoardController.listAwayTeams(req, res));
routerLeaderBoard.get('/', (req, res) => leaderBoardController.listAllTeams(req, res));

export default routerLeaderBoard;
