import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';
import LeaderBoardService from '../services/leaderboard.service';

const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const routerLeaderBoard = Router();

routerLeaderBoard.get('/home', (req, res) => leaderBoardController.listHomeTeams(req, res));

export default routerLeaderBoard;
