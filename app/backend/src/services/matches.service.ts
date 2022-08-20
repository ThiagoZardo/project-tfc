import Teams from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import IMatches, { INewMatches } from '../interfaces/IMatches';

export default class MatchesService implements IMatches<MatchesModel> {
  constructor(private matchesModel = MatchesModel) {}

  async listAll(): Promise<MatchesModel[]> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    });
    return matches;
  }

  async searchMatches(q: string): Promise<MatchesModel[]> {
    let query = true;
    if (q === 'true') query = true;
    if (q === 'false') query = false;
    const searching = await this.matchesModel.findAll({
      where: { inProgress: query },
      include: [
        { model: Teams, as: 'teamHome' },
        { model: Teams, as: 'teamAway' },
      ],
    });
    return searching as MatchesModel[];
  }

  async create(matche: INewMatches): Promise<MatchesModel> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matche;
    const matcheCreated = await this.matchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return matcheCreated as MatchesModel;
  }

  async matchInProgress(id: number): Promise<string> {
    await this.matchesModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return 'Finished';
  }
}
