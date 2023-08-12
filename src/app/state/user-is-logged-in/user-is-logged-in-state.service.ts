import { Injectable } from '@angular/core';

import { StateService } from '../state.service';

@Injectable({
  providedIn: 'root',
})
export class UserIsLoggedInStateService extends StateService<boolean> {
  public getStateName(): string {
    return 'User Is Logged In';
  }

  public getDefaultValue(): boolean {
    return false;
  }
}
