import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, tap } from 'rxjs';

import { Page } from './../../shared/enums/page.enum';

@Injectable({
  providedIn: 'root',
})
export class ActivePageService {
  private readonly _value$ = new BehaviorSubject<Page>(Page.UNKNOWN);
  public readonly value$ = this._value$.asObservable();

  constructor(private readonly _router: Router) {
    this._value$.next(this.determinePageByUrl(this._router.url));
    this._router.events
      .pipe(
        filter(isNavigationEnd),
        tap((event) =>
          this._value$.next(this.determinePageByUrl(event.urlAfterRedirects))
        )
      )
      .subscribe();
  }

  private determinePageByUrl(url: string): Page {
    if (url.includes(Page.HELP_OFFERS)) {
      return Page.HELP_OFFERS;
    }

    if (url.includes(Page.HELP_REQUESTS)) {
      return Page.HELP_REQUESTS;
    }

    if (url.includes(Page.NOT_FOUND)) {
      return Page.NOT_FOUND;
    }

    return Page.UNKNOWN;
  }
}

const isNavigationEnd = (value: unknown): value is NavigationEnd =>
  value instanceof NavigationEnd;
