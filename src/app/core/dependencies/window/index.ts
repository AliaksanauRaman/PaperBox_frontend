import { InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const WINDOW = new InjectionToken<Window>('WINDOW', {
  providedIn: 'root',
  factory: () => {
    const _document = inject(DOCUMENT);
    const _window = _document.defaultView;

    if (_window === null) {
      throw new Error('Window is not defined!');
    }

    return _window;
  },
});
