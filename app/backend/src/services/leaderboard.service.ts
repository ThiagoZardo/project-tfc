import TeamsModel from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
import { IstaticMatches,
  ITotalsStaticMatches,
  IstaticMatchesTeamAway,
} from '../interfaces/IMatches';
import { InfoTeamsHome, InfoTeamsAway } from '../interfaces/ITeams';

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

  public static getInfoMatchesHomeTeams(homeTeams: InfoTeamsHome[]) {
    const infoMatches = homeTeams.map((el) => ({
      homeTeams: el.teamHome?.teamName,
      homeTeamGoals: el.homeTeamGoals,
      awayTeam: el.awayTeam,
      awayTeamGoals: el.awayTeamGoals,
    }));
    return LeaderBoardService.getStaticsMatches(infoMatches);
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

  public async listAwayTeams() {
    const awayTeams = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamAway' },
      ],
      where: { inProgress: false },
    });
    const retorno = LeaderBoardService.getInfoMatchesAwayTeams(awayTeams);
    return retorno;
  }

  public static getInfoMatchesAwayTeams(awayTeams: InfoTeamsAway[]) {
    const infoMatches = awayTeams.map((el) => ({
      awayTeam: el.teamAway?.teamName,
      awayTeamGoals: el.awayTeamGoals,
      homeTeams: el.homeTeam,
      homeTeamGoals: el.homeTeamGoals,
    }));
    return LeaderBoardService.getStaticsMatchesTeamAway(infoMatches);
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
    return LeaderBoardService.getSumResults(staticMatches);
  }

  public static generateClassification(total: ITotalsStaticMatches[]) {
    const classificationPoints = total.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      return 0;
    });
    return LeaderBoardService.dismemberGoasBalance(classificationPoints);
  }

  public static dismemberGoasBalance(classificationPoints: ITotalsStaticMatches[]) {
    const classificationgoalsBalance = classificationPoints.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance > b.goalsBalance) return -1;
        if (a.goalsBalance < b.goalsBalance) return 1;
      }
      return 0;
    });
    return LeaderBoardService.dismemberGoalsFavor(classificationgoalsBalance);
  }

  public static dismemberGoalsFavor(classificationgoalsBalance: ITotalsStaticMatches[]) {
    const orderGoalsFavor = classificationgoalsBalance.sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
        if (a.goalsFavor > b.goalsFavor) return -1;
        if (a.goalsFavor < b.goalsFavor) return 1;
      }
      return 0;
    });
    return LeaderBoardService.dismemberGoalsOwn(orderGoalsFavor);
  }

  public static dismemberGoalsOwn(orderGoalsFavor: ITotalsStaticMatches[]) {
    const orderGoalsOwn = orderGoalsFavor.sort((a, b) => {
      if (a.totalPoints === b.totalPoints && a.goalsBalance === b.goalsBalance) {
        if (a.goalsFavor === b.goalsFavor) {
          if (a.goalsOwn > b.goalsOwn) return 1;
          if (a.goalsOwn < b.goalsOwn) return -1;
        }
        return 0;
      }
      return 0;
    });
    return orderGoalsOwn;
  }
}
