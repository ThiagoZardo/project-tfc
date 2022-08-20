import { Request, Response } from 'express';
import IMatches from '../interfaces/IMatches';
import MatchesModel from '../database/models/matches.model';

export default class MatchesController {
  constructor(private matchesService: IMatches<MatchesModel>) {}

  async listAll(req: Request, res: Response) {
    const q = req.query.inProgress as string;
    if (q) {
      const search = await this.matchesService.searchMatches(q);
      return res.status(200).json(search);
    }
    const matches = await this.matchesService.listAll();
    return res.status(200).json(matches);
  }

  async create(req: Request, res: Response) {
    const matche = req.body;
    const newMatche = await this.matchesService.create(matche);
    return res.status(201).json(newMatche);
  }

  async matchInProgress(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const finishMatch = await this.matchesService.matchInProgress(id);
    return res.status(200).json({ message: finishMatch });
  }
}
