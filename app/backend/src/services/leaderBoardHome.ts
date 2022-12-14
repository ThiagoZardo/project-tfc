import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import { IstaticMatches, ITotalsStaticMatches } from '../interfaces/IMatches';
import { InfoTeamsHome } from '../interfaces/ITeams';

export default class LeaderBoardHomeTeams {
  constructor(private matchesModel = MatchesModel) {}

  public async listHomeTeams() {
    const homeTeams = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome' },
      ],
      where: { inProgress: false },
    });
    const retorno = LeaderBoardHomeTeams.getInfoMatchesHomeTeams(homeTeams);
    return retorno;
  }

  public static getInfoMatchesHomeTeams(homeTeams: InfoTeamsHome[]) {
    const infoMatches = homeTeams.map((el) => ({
      homeTeams: el.teamHome?.teamName,
      homeTeamGoals: el.homeTeamGoals,
      awayTeam: el.awayTeam,
      awayTeamGoals: el.awayTeamGoals,
    }));
    return LeaderBoardHomeTeams.getStaticsMatches(infoMatches);
  }

  public static getStaticsMatches(infoMatches: InfoTeamsHome[]) {
    const staticMatches = infoMatches.map((el) => ({
      name: el.homeTeams,
      pointsVictory: infoMatches.filter((team) => team.homeTeams === el.homeTeams)
        .map((victory) => (
          (victory.homeTeamGoals > victory.awayTeamGoals) ? Number(3) : Number(0))),
      totalGames: infoMatches.filter((team) => team.homeTeams === el.homeTeams)
        .map((total) => (total.homeTeams ? Number(1) : Number(0))).reduce((a, b) => a + b),
      pointsDraw: infoMatches.filter((team) => team.homeTeams === el.homeTeams)
        .map((draw) => (draw.homeTeamGoals === draw.awayTeamGoals ? Number(1) : Number(0))),
      loss: infoMatches.filter((team) => team.homeTeams === el.homeTeams)
        .map((loss) => (loss.homeTeamGoals < loss.awayTeamGoals ? Number(1) : Number(0))),
      goalsFavor: infoMatches.filter((team) => team.homeTeams === el.homeTeams)
        .map((goals) => (goals.homeTeamGoals)),
      goalsOwn: infoMatches.filter((team) => team.homeTeams === el.homeTeams)
        .map((goals) => (goals.awayTeamGoals)),
    }));
    return LeaderBoardHomeTeams.getSumResults(staticMatches);
  }

  public static getSumResults(staticMatches: IstaticMatches[]) {
    const totals = staticMatches.map((match) => ({
      name: match.name,
      totalPoints: match.pointsVictory.reduce((a, b) => a + b) + match.pointsDraw
        .reduce((a, b) => a + b),
      totalGames: match.totalGames,
      totalVictories: match.pointsVictory.reduce((a, b) => a + b) / 3,
      totalDraws: match.pointsDraw.reduce((a, b) => a + b),
      totalLosses: match.loss.reduce((a, b) => a + b),
      goalsFavor: match.goalsFavor.reduce((a, b) => a + b),
      goalsOwn: match.goalsOwn.reduce((a, b) => a + b),
      goalsBalance: match.goalsFavor
        .reduce((a, b) => a + b) - match.goalsOwn.reduce((a, b) => a + b),
      efficiency: match.pointsVictory.reduce((a, b) => a + b) + match.pointsDraw
        .reduce((a, b) => a + b) / ((match.totalGames * 3) * Number(100)),
    }));
    return LeaderBoardHomeTeams.totalsTeamsHome(totals);
  }

  public static totalsTeamsHome(totals: ITotalsStaticMatches[]) {
    const setTeam = new Set();

    const filterTeams = totals.filter((team) => {
      const duplicatedNameTeam = setTeam.has(team.name);
      setTeam.add(team.name);
      return !duplicatedNameTeam;
    });

    const total = filterTeams.map((el) => ({
      ...el,
      efficiency: ((el.totalPoints / (el.totalGames * 3)) * 100).toFixed(2),
    }));
    LeaderBoardHomeTeams.generateClassification(total);
    return total;
  }

  public static generateClassification(total: ITotalsStaticMatches[]) {
    const classificationPoints = total.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
    return classificationPoints;
  }
}
