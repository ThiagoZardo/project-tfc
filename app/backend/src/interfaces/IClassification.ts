import MatchesModel from '../database/models/matches.model';

export interface IClassification<T> {
  listHomeTeams(): Promise<T[]>
}

export interface IHomeTeamsInfos<T> {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
  teamHome?: { id?: number, teamName?: string };
  getNameTeams(homeTeams: MatchesModel[]): Promise<T>
}

export interface Iclass {
  name?: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency?: string,
}

export interface IclassTotals {
  name?: string,
  totalPoints: number[],
  totalGames: number[],
  totalVictories: number[],
  totalDraws: number[],
  totalLosses: number[],
  goalsFavor: number[],
  goalsOwn: number[],
  goalsBalance: number[],
}
