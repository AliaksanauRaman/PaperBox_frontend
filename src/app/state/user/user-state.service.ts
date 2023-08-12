import { Injectable } from '@angular/core';

import { NullableStateService } from '../nullable-state.service';
import { UserType } from '../../shared/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserStateService extends NullableStateService<UserType> {
  public getStateName(): string {
    return 'User';
  }

  public getDefaultValue(): UserType | null {
    return null;
  }
}
