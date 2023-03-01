import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// TODO: Unused
export class TypeAssertionService {
  public isDefined<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null;
  }
}
