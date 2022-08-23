import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  constructor(private leaderService: LeaderBoardService) {}

  async listHomeTeams(req: Request, res: Response) {
    const homeTeams = await this.leaderService.listHomeTeams();
    res.status(200).json(homeTeams);
  }

  async listAwayTeams(req: Request, res: Response) {
    const awayTeams = await this.leaderService.listAwayTeams();
    res.status(200).json(awayTeams);
  }
}
