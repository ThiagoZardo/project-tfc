import { Request, Response } from 'express';
import LeaderBoardHomeTeams from '../services/leaderBoardHome';
import LeaderBoardAwaysTeams from '../services/leaderBoardAways';
import LeaderBoardAllTeams from '../services/leaderBoardAllTeams';

export default class LeaderBoardController {
  constructor(
    private leaderHomeTeams: LeaderBoardHomeTeams,
    private leaderAwaysTeams: LeaderBoardAwaysTeams,
    private leaderAllTeams: LeaderBoardAllTeams,
  ) {}

  async listHomeTeams(req: Request, res: Response) {
    const homeTeams = await this.leaderHomeTeams.listHomeTeams();
    res.status(200).json(homeTeams);
  }

  async listAwayTeams(req: Request, res: Response) {
    const awayTeams = await this.leaderAwaysTeams.listAwayTeams();
    res.status(200).json(awayTeams);
  }

  async listAllTeams(req: Request, res: Response) {
    const allTeams = await this.leaderAllTeams.listAllTeams();
    res.status(200).json(allTeams);
  }
}
