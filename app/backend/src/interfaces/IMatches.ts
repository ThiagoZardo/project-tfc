export default interface IMatches<T> {
  listAll(): Promise<T[]>,
  searchMatches(inProgress: string): Promise<T[]>
  create(matche: INewMatches): Promise<T>
  matchInProgress(id: number): Promise<string>
  matchUptade(id?: number, homeTeamGoals?: number, awayTeamGoals?: number): Promise<void>
}

export interface INewMatches {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IstaticMatches {
  name: string | undefined,
  pointsVictory: number[],
  totalGames: number,
  pointsDraw: number[],
  loss: number[],
  goalsFavor: number[],
  goalsOwn: number[],
}

export interface IstaticMatchesTeamAway {
  awayTeam: string | undefined;
  awayTeamGoals: number;
  homeTeams: number | undefined;
  homeTeamGoals: number;
}

export interface ITotalsStaticMatchesTeamAway {
  name: string | undefined;
  pointsVictory: number[];
  totalGames: number;
  pointsDraw: number[];
  loss: number[];
  goalsFavor: number[];
  goalsOwn: number[];
}

export interface ITotalsStaticMatches {
  name?: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency?: string | number,
}
