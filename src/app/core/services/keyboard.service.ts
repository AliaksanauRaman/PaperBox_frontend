import { Injectable, Inject } from '@angular/core';
import { fromEvent, Observable, filter } from 'rxjs';

import { WINDOW, WindowType } from '../dependencies/window';

enum KeyCode {
  F8 = 'F8',
}

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  public static readonly KeyCode = KeyCode;

  constructor(
    @Inject(WINDOW)
    private readonly window: WindowType
  ) {}

  public onKeyup(code: KeyCode): Observable<KeyboardEvent> {
    return fromEvent<KeyboardEvent>(this.window, 'keyup').pipe(
      filter((event) => event.code === code)
    );
  }
}
