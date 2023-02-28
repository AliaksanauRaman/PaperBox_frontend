import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeAssertionService {
  public isDefined<T>(value: T): value is NonNullable<T> {
    return value !== undefined && value !== null;
  }
}
