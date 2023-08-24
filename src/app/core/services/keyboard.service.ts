import { Injectable, inject } from '@angular/core';
import { fromEvent, Observable, filter } from 'rxjs';

import { WINDOW } from '../dependencies/window';

enum KeyCode {
  F8 = 'F8',
}

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  public static readonly KeyCode = KeyCode;

  private readonly _window = inject(WINDOW);

  public onKeyup(code: KeyCode): Observable<KeyboardEvent> {
    return fromEvent<KeyboardEvent>(this._window, 'keyup').pipe(
      filter((event) => event.code === code)
    );
  }
}
