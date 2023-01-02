import { Injectable } from '@angular/core';
import { Subject, filter, map, Observable } from 'rxjs';

import { AppEventUnion } from './app-event.union';
import { AppEventName } from './app-event-name.enum';

@Injectable({
  providedIn: 'root',
})
export class AppEventBusService {
  private readonly _events$ = new Subject<AppEventUnion>();

  constructor() {
    // TODO: FOR DEV ONLY
    this._events$.subscribe(event => {
      console.log(event);
    });
  }

  public emit(event: AppEventUnion): void {
    this._events$.next(event);
  }

  public on<T>(eventName: AppEventName): Observable<T> {
    return this._events$.pipe(
      filter(event => event.name === eventName),
      map(({ payload }) => payload as T),
    );
  }
}
