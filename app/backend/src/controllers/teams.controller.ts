import { Request, Response } from 'express';
import ITeams from '../interfaces/ITeams';
import TeamModel from '../database/models/teams.model';

export default class TeamsController {
  constructor(private teamsService: ITeams<TeamModel>) {}

  async listAll(req: Request, res: Response) {
    const teams = await this.teamsService.listAll();
    return res.status(200).json(teams);
  }
}
