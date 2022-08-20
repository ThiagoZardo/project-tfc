export default interface IMatches<T> {
  listAll(): Promise<T[]>,
  searchMatches(inProgress: string): Promise<T[]>
  create(matche: INewMatches): Promise<T>
  matchInProgress(id: number): Promise<string>
}

export interface INewMatches {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
