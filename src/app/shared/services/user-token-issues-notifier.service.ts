import { Injectable, inject } from '@angular/core';
import { filter, tap } from 'rxjs';

import { UserTokenStateService } from '../../state/user-token/user-token-state.service';
import { WarningNotificationService } from '../../core/services/warning-notification.service';
import { JWT_TOKEN_DECODER } from '../../core/services/jwt-token-decoder/injection-token';

@Injectable({
  providedIn: 'root',
})
export class UserTokenIssuesNotifierService {
  private readonly _userTokenStateService = inject(UserTokenStateService);
  private readonly _warningNotificationService = inject(
    WarningNotificationService
  );
  private readonly _jwtTokenDecoder = inject(JWT_TOKEN_DECODER);

  public startWatching(): void {
    this._userTokenStateService.stream$
      .pipe(
        filter(
          (userTokenValue): userTokenValue is string => userTokenValue !== null
        ),
        tap((userTokenValue) => {
          const decodedUserToken = this._jwtTokenDecoder.decode(userTokenValue);

          if (decodedUserToken.isExpired()) {
            this._warningNotificationService.showMessage(
              'warnings.sessionIsExpired'
            );
          }
        })
      )
      .subscribe();
  }
}
