import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeObserverService {
  public readonly isMobileOrTablet$ = this.breakpointObserver
    // The value is taken based on _scss-variables.scss
    .observe(['(max-width: 768px)'])
    .pipe(map(({ matches }) => matches));

  constructor(private readonly breakpointObserver: BreakpointObserver) {}
}
