export interface IClassification<T> {
  listHomeTeams(): Promise<T[]>
}
