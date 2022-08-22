import TeamsModel from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
// import { IClassification } from '../interfaces/IClassification';
import { IstaticMatches, ITotalsStaticMatches } from '../interfaces/IMatches';
import { InfoTeams } from '../interfaces/ITeams';

export default class LeaderBoardService {
  constructor(private matchesModel = MatchesModel) {}

  public async listHomeTeams() {
    const homeTeams = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome' },
      ],
      where: { inProgress: false },
    });
    const retorno = LeaderBoardService.getInfoMatchesHomeTeams(homeTeams);
    return retorno;
  }

  public static getInfoMatchesHomeTeams(homeTeams: InfoTeams[]) {
    const infoMatches = homeTeams.map((el) => ({
      homeTeams: el.teamHome?.teamName,
      homeTeamGoals: el.homeTeamGoals,
      awayTeam: el.awayTeam,
      awayTeamGoals: el.awayTeamGoals,
    }));
    return LeaderBoardService.getStaticsMatches(infoMatches);
  }

  public static getStaticsMatches(infoMatches: InfoTeams[]) {
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
    return LeaderBoardService.getSumResults(staticMatches);
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
    return LeaderBoardService.totalsTeamsHome(totals);
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
    console.log(total);
    LeaderBoardService.generateClassification(total);
    return total;
  }

  public static generateClassification(total: ITotalsStaticMatches[]) {
    const classificationPoints = total.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      return 0;
    });
    const classificationGoalsFavor = classificationPoints.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance > b.goalsBalance) return -1;
        if (a.goalsBalance < b.goalsBalance) return 1;
      }
      return 0;
    });
    return LeaderBoardService.geberateClassificationDismember(classificationGoalsFavor);
  }

  public static geberateClassificationDismember(classificationGoalsFavor: ITotalsStaticMatches[]) {
    const orderGoalsFavor = classificationGoalsFavor.sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
        if (a.goalsFavor > b.goalsFavor) return -1;
        if (a.goalsFavor < b.goalsFavor) return 1;
      }
      return 0;
    });
    return orderGoalsFavor;
  }
}
