import Teams from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import { IClassification } from '../interfaces/IClassification';

export default class LeaderBoardService implements IClassification<MatchesModel> {
  constructor(private matchesModel = MatchesModel) {}

  async listHomeTeams(): Promise<MatchesModel[]> {
    const homeTeams = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Teams, as: 'teamHome' },
      ],
    });
    return homeTeams;
  }
}
