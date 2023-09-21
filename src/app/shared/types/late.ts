export class LateOptions {
  constructor(public readonly isOneTimeSet: boolean) {}
}

export class Late<T = unknown> {
  private _value?: T;
  private _isSet = false;

  public get value(): T | undefined {
    return this._value;
  }

  public get isSet(): boolean {
    return this._isSet;
  }

  constructor(private readonly _options = new LateOptions(true)) {}

  public set(value: T | undefined): void {
    if (this._options.isOneTimeSet && this._isSet) {
      return;
    }

    this._value = value;
    this._isSet = true;
  }
}
