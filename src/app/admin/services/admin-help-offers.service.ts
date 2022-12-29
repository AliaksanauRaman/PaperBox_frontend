import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

import { AdminHelpOffersHttpService } from './admin-help-offers-http.service';

import { HttpRequestStateType } from '../../shared/types/http-request-state.type';
import { HelpOfferFullPreviewType } from '../../shared/types/help-offer-full-preview.type';
import { HttpRequestInitialState } from '../../shared/classes/http-request-initial-state.class';
import { HttpRequestSuccessState } from './../../shared/classes/http-request-success-state.class';
import { HttpRequestFailureState } from './../../shared/classes/http-request-failure-state.class';

@Injectable()
export class AdminHelpOffersService {
  private readonly getFullPreviewsOfAllRequestState$ = new BehaviorSubject<
    HttpRequestStateType<Array<HelpOfferFullPreviewType>>
  >(new HttpRequestInitialState());

  public readonly getFullPreviewsOfAllRequestStateStream =
    this.getFullPreviewsOfAllRequestState$.asObservable();

  constructor(
    private readonly adminHelpOffersHttpService: AdminHelpOffersHttpService,
  ) {}

  public makeGetFullPreviewsOfAllRequest(): Observable<unknown> {
    return this.adminHelpOffersHttpService.getFullPreviewsOfAll()
      .pipe(
        tap((fullPreviewsOfAllHelpOffers) => {
          const successState = new HttpRequestSuccessState(fullPreviewsOfAllHelpOffers);
          this.getFullPreviewsOfAllRequestState$.next(successState);
        }),
        catchError((error: HttpErrorResponse) => {
          const failureState = new HttpRequestFailureState(error);
          this.getFullPreviewsOfAllRequestState$.next(failureState);
          return throwError(() => error);
        }),
      );
  }
}
