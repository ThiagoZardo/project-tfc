import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import { InfoTeamsAway } from '../interfaces/ITeams';
import {
  IstaticMatches,
  ITotalsStaticMatches,
  IstaticMatchesTeamAway,
} from '../interfaces/IMatches';

export default class LeaderBoardAwaysTeams {
  constructor(private matchesModel = MatchesModel) {}

  public async listAwayTeams() {
    const awayTeams = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamAway' },
      ],
      where: { inProgress: false },
    });
    const retorno = LeaderBoardAwaysTeams.getInfoMatchesAwayTeams(awayTeams);
    return retorno;
  }

  public static getInfoMatchesAwayTeams(awayTeams: InfoTeamsAway[]) {
    const infoMatches = awayTeams.map((el) => ({
      awayTeam: el.teamAway?.teamName,
      awayTeamGoals: el.awayTeamGoals,
      homeTeams: el.homeTeam,
      homeTeamGoals: el.homeTeamGoals,
    }));
    return LeaderBoardAwaysTeams.getStaticsMatchesTeamAway(infoMatches);
  }

  public static getStaticsMatchesTeamAway(infoMatches: IstaticMatchesTeamAway[]) {
    const staticMatches = infoMatches.map((el) => ({
      name: el.awayTeam,
      pointsVictory: infoMatches.filter((team) => team.awayTeam === el.awayTeam)
        .map((victory) => (
          (victory.awayTeamGoals > victory.homeTeamGoals) ? Number(3) : Number(0))),
      totalGames: infoMatches.filter((team) => team.awayTeam === el.awayTeam)
        .map((total) => (total.awayTeam ? Number(1) : Number(0))).reduce((a, b) => a + b),
      pointsDraw: infoMatches.filter((team) => team.awayTeam === el.awayTeam)
        .map((draw) => (draw.awayTeamGoals === draw.homeTeamGoals ? Number(1) : Number(0))),
      loss: infoMatches.filter((team) => team.awayTeam === el.awayTeam)
        .map((loss) => (loss.awayTeamGoals < loss.homeTeamGoals ? Number(1) : Number(0))),
      goalsFavor: infoMatches.filter((team) => team.awayTeam === el.awayTeam)
        .map((goals) => (goals.awayTeamGoals)),
      goalsOwn: infoMatches.filter((team) => team.awayTeam === el.awayTeam)
        .map((goals) => (goals.homeTeamGoals)),
    }));
    return LeaderBoardAwaysTeams.getSumResults(staticMatches);
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
    return LeaderBoardAwaysTeams.totalsTeamsHome(totals);
  }

  public static totalsTeamsHome(totals: ITotalsStaticMatches[]) {
    const setPerson = new Set();

    const filterTeams = totals.filter((team) => {
      const duplicatedNameTeam = setPerson.has(team.name);
      setPerson.add(team.name);
      return !duplicatedNameTeam;
    });

    const total = filterTeams.map((el) => ({
      ...el,
      efficiency: ((el.totalPoints / (el.totalGames * 3)) * 100).toFixed(2),
    }));
    LeaderBoardAwaysTeams.generateClassification(total);
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
