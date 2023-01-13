export class DataSourceOption<T = unknown> {
  constructor(public readonly label: string, public readonly value: T) {}
}
