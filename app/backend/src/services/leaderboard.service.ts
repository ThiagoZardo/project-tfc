import TeamsModel from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import { IClassification } from '../interfaces/IClassification';

interface InfoTeams {
  homeTeam?: number,
  homeTeamGoals: number,
  awayTeam?: number,
  awayTeamGoals: number,
  teamHome?: { id?: number, teamName?: string },
  homeTeams?: string,
}

export default class LeaderBoardService implements IClassification<MatchesModel> {
  constructor(private matchesModel = MatchesModel) {}

  async listHomeTeams(): Promise<MatchesModel[]> {
    const homeTeams = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome' },
      ],
      where: { inProgress: false },
    });
    LeaderBoardService.getInfoTeams(homeTeams);
    return homeTeams;
  }

  static getInfoTeams(homeTeams: InfoTeams[]) {
    const infos = homeTeams.map((el) => ({
      homeTeams: el.teamHome?.teamName,
      homeTeamGoals: el.homeTeamGoals,
      awayTeam: el.awayTeam,
      awayTeamGoals: el.awayTeamGoals,
    }));
    LeaderBoardService.getStaticsMatches(infos);
    // console.log(infos);
  }

  static getStaticsMatches(infos: InfoTeams[]) {
    const staticMatches = infos.map((el) => ({
      name: el.homeTeams,
      pointsVictory: infos.filter((team) => team.homeTeams === el.homeTeams)
        .map((victory) => (victory.homeTeamGoals > victory.awayTeamGoals ? 3 : 0)),
      totalGames: infos.filter((team) => team.homeTeams === el.homeTeams)
        .map((total) => (total.homeTeams ? 1 : 0)),
      pointsDraw: infos.filter((team) => team.homeTeams === el.homeTeams)
        .map((draw) => (draw.homeTeamGoals === draw.awayTeamGoals ? 1 : 0)),
      loss: infos.filter((team) => team.homeTeams === el.homeTeams)
        .map((loss) => (loss.homeTeamGoals < loss.awayTeamGoals ? 0 : 0)),
      goalsFavor: infos.filter((team) => team.homeTeams === el.homeTeams)
        .map((goals) => (goals.homeTeamGoals)),
      goalsOwn: infos.filter((team) => team.homeTeams === el.homeTeams)
        .map((goals) => (goals.awayTeamGoals)),
    }));
    console.log(staticMatches);
    // LeaderBoardService.getSumResults(staticMatches);
  }
}
