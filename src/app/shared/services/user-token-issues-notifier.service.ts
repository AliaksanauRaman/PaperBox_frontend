import { Injectable } from '@angular/core';
import { filter, tap } from 'rxjs';

import { UserTokenService } from './user-token.service';
import { TypeAssertionService } from '../../core/services/type-assertion.service';
import { UserTokenEntity } from '../entities/user-token.entity';
import { WarningNotificationService } from '../../core/services/warning-notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserTokenIssuesNotifierService {
  constructor(
    private readonly _userTokenService: UserTokenService,
    private readonly _typeAssertionService: TypeAssertionService,
    private readonly _warningNotificationService: WarningNotificationService
  ) {}

  public startWatching(): void {
    this._userTokenService.value$
      .pipe(
        // We should not unsubscribe here because this service will
        // leave as long as the app
        filter(this._typeAssertionService.isNotNull),
        tap((userToken) => {
          const entity = new UserTokenEntity(userToken);

          try {
            entity.decode();
          } catch (_error: unknown) {
            this._warningNotificationService.showMessage(
              'warnings.tokenIsBroken'
            );
            return;
          }

          if (entity.expired) {
            this._warningNotificationService.showMessage(
              'warnings.sessionIsExpired'
            );
          }
        })
      )
      .subscribe();
  }
}
