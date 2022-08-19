export default interface ITeams<T> {
  id?: number,
  teamName?: string,
  listAll(): Promise<T[]>,
}
