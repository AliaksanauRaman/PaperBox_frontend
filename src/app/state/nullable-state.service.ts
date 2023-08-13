import { BehaviorSubject } from 'rxjs';

export abstract class NullableStateService<T> {
  private readonly _stream$ = new BehaviorSubject<T | null>(
    this.getDefaultValue()
  );
  public readonly stream$ = this._stream$.asObservable();

  public abstract getStateName(): string;
  public abstract getDefaultValue(): T | null;

  public get(): T | null {
    return this._stream$.getValue();
  }

  public set(value: T): void {
    this._stream$.next(value);
  }

  public remove(): void {
    this._stream$.next(null);
  }
}
