import { Injectable } from '@angular/core';

import { NullableStateService } from '../nullable-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserTokenStateService extends NullableStateService<string> {
  public getStateName(): string {
    return 'User Token';
  }

  public getDefaultValue(): string | null {
    return null;
  }
}
