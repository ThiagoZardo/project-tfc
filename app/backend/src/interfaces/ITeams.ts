export default interface ITeams<T> {
  id?: number,
  teamName?: string,
  listAll(): Promise<T[]>,
  findById(id: number): Promise<T>
}

export interface InfoTeams {
  homeTeam?: number,
  homeTeamGoals: number,
  awayTeam?: number,
  awayTeamGoals: number,
  teamHome?: { id?: number, teamName?: string },
  homeTeams?: string,
}
