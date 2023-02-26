import { Injectable } from '@angular/core';
import { Subject, filter, map, Observable, take, tap } from 'rxjs';

import { AppEventUnion } from './app-event.union';
import { AppEventName } from './app-event-name.enum';

@Injectable({
  providedIn: 'root',
})
export class AppEventBusService {
  private readonly _events$ = new Subject<AppEventUnion>();
  // TODO: Draft implementation
  private readonly _destroys$ = new Subject<AppEventName>();

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

  // TODO: Draft implementation
  public destroy(eventName: AppEventName): void {
    this._destroys$.next(eventName);
  }

  // TODO: Draft implementation
  public getDestroyStream(eventName: AppEventName): Subject<void> {
    const destroyStream$ = new Subject<void>();

    this._destroys$
      .pipe(
        filter(name => name === eventName),
        tap(() => {
          destroyStream$.next();
          destroyStream$.complete();
        }),
        take(1),
      )
      .subscribe();

    return destroyStream$;
  }
}
