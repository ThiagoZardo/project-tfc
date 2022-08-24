import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import LeaderBoardAwaysTeams from './leaderBoardAways';
import LeaderBoardHomeTeams from './leaderBoardHome';
import { Iclass, IclassTotals } from '../interfaces/IClassification';

export default class LeaderBoardAllTeams {
  constructor(private matchesModel = MatchesModel) {}

  public async listAllTeams() {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome' },
        { model: TeamsModel, as: 'teamAway' },
      ],
      where: { inProgress: false },
    });
    const classHome = LeaderBoardHomeTeams.getInfoMatchesHomeTeams(matches);
    const classAlway = LeaderBoardAwaysTeams.getInfoMatchesAwayTeams(matches);
    const teams = classHome.concat(classAlway);

    return LeaderBoardAllTeams.classificationAllTeams(teams);
  }

  public static classificationAllTeams(teams: Iclass[]) {
    const totalTeams = teams.map((el) => ({
      name: el.name,
      totalPoints: teams.filter((team) => team.name === el.name).map((t) => t.totalPoints),
      totalGames: teams.filter((team) => team.name === el.name).map((t) => t.totalGames),
      totalVictories: teams.filter((team) => team.name === el.name).map((t) => t.totalVictories),
      totalDraws: teams.filter((team) => team.name === el.name).map((t) => t.totalDraws),
      totalLosses: teams.filter((team) => team.name === el.name).map((t) => t.totalLosses),
      goalsFavor: teams.filter((team) => team.name === el.name).map((t) => t.goalsFavor),
      goalsOwn: teams.filter((team) => team.name === el.name).map((t) => t.goalsOwn),
      goalsBalance: teams.filter((team) => team.name === el.name).map((t) => t.goalsBalance),
    }));
    return LeaderBoardAllTeams.sumTotals(totalTeams);
  }

  public static sumTotals(totalTeams: IclassTotals[]) {
    const totals = totalTeams.map((el) => ({
      name: el.name,
      totalPoints: el.totalPoints.reduce((a, b) => a + b),
      totalGames: el.totalGames.reduce((a, b) => a + b),
      totalVictories: el.totalVictories.reduce((a, b) => a + b),
      totalDraws: el.totalDraws.reduce((a, b) => a + b),
      totalLosses: el.totalLosses.reduce((a, b) => a + b),
      goalsFavor: el.goalsFavor.reduce((a, b) => a + b),
      goalsOwn: el.goalsOwn.reduce((a, b) => a + b),
      goalsBalance: el.goalsBalance.reduce((a, b) => a + b),
    }));
    return LeaderBoardAllTeams.totalsTeams(totals);
  }

  public static totalsTeams(totals: Iclass[]) {
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
    LeaderBoardHomeTeams.generateClassification(total);
    return total;
  }

  public static generateClassification(total: Iclass[]) {
    const classificationPoints = total.sort((a, b) => b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
    return classificationPoints;
  }
}
