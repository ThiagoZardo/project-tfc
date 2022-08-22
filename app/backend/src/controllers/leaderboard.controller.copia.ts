import { Request, Response } from 'express';
// import LeaderBoardService from '../services/leaderboard.service';
import { IClassification } from '../interfaces/IClassification';
import MatchesModel from '../database/models/matches.model';

export default class LeaderBoardController {
  constructor(private leaderService: IClassification<MatchesModel>) {}

  async listHomeTeams(req: Request, res: Response) {
    const homeTeams = await this.leaderService.listHomeTeams();
    // LeaderBoardService.getNameTeams(homeTeams);
    res.status(200).json(homeTeams);
  }
}
