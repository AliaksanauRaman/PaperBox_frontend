import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  private readonly _value$ = new BehaviorSubject<string | null>(null);
  public readonly value$ = this._value$.asObservable();

  public set(userToken: string): void {
    this._value$.next(userToken);
  }

  public remove(): void {
    this._value$.next(null);
  }
}
