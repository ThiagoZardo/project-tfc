export default interface IMatches<T> {
  listAll(): Promise<T[]>,
  searchMatches(inProgress: string): Promise<T[]>
}
