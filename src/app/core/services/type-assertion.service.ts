import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypeAssertionService {
  public isNotNull<T>(value: T): value is NonNullable<T> {
    return value !== null;
  }
}
