import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap, takeUntil } from 'rxjs';

import { UserStateService } from '../../state/user/user-state.service';

import { DestroyEmitter } from '@shared/abstracts/destroy-emitter.class';
import { PublishedApplicationType } from '../types/published-application.type';

@Injectable()
export class ApplicationCardAuthorStateService extends DestroyEmitter {
  private readonly _userStateService = inject(UserStateService);
  private readonly _isApplicationAuthor$ = new BehaviorSubject<boolean>(false);

  public readonly isApplicationAuthor$ =
    this._isApplicationAuthor$.asObservable();

  public init(publishedApplication: PublishedApplicationType): void {
    this._userStateService.stream$
      .pipe(
        tap((user) => {
          const isApplicationAuthor =
            user !== null && user.id === publishedApplication.userId;
          this._isApplicationAuthor$.next(isApplicationAuthor);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
