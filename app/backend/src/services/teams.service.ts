import TeamModel from '../database/models/teams.model';
import ITeams from '../interfaces/ITeams';

export default class TeamsService implements ITeams<TeamModel> {
  constructor(private teamsModel = TeamModel) {}

  async listAll(): Promise<TeamModel[]> {
    const teams = await this.teamsModel.findAll();
    return teams;
  }

  async findById(id: number): Promise<TeamModel> {
    const team = await this.teamsModel.findOne({ where: { id } });
    return team as TeamModel;
  }
}
