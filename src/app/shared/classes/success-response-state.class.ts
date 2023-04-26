export class SuccessResponseState<T> {
  constructor(
    public readonly data: T,
    public readonly inProgress = false,
    public readonly error = null
  ) {}
}
