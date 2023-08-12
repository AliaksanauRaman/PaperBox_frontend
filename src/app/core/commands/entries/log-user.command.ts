import { Injectable, inject } from '@angular/core';

import { UserStateService } from '../../../state/user/user-state.service';

import { CommandInterface } from '../command.interface';

@Injectable({
  providedIn: 'root',
})
export class LogUserCommand implements CommandInterface {
  private readonly _userStateService = inject(UserStateService);

  public static readonly Label = 'log:user';

  public execute(): void {
    alert(JSON.stringify(this._userStateService.get(), null, 2));
  }
}
