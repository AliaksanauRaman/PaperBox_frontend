import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { filter, tap, takeUntil } from 'rxjs';

import { DestroyEmitter } from '../../../shared/abstracts/destroy-emitter.class';
import { UsersFilterValueType } from '../../types/users-filter-value.type';
import { USER_ROLE_LIST } from '../../../shared/constants/user-role-list';
import { FULL_USER_STATUS_LIST } from '../../constants/full-user-status-list';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { FullUserStatus } from '../../enums/full-user-status.enum';

@Component({
  selector: 'app-admin-users-filter-form',
  templateUrl: './admin-users-filter-form.component.html',
  styleUrls: ['./admin-users-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersFilterFormComponent
  extends DestroyEmitter
  implements OnInit
{
  @Output()
  public readonly valueChange = new EventEmitter<UsersFilterValueType>();

  protected readonly _USER_ROLE_LIST = USER_ROLE_LIST;
  protected readonly _FULL_USER_STATUS_LIST = FULL_USER_STATUS_LIST;

  protected readonly _filterForm = this._formBuilder.group({
    email: this._formBuilder.control<string>(''),
    role: this._formBuilder.control<'' | UserRole>(''),
    status: this._formBuilder.control<'' | FullUserStatus>(''),
  });

  constructor(private readonly _formBuilder: NonNullableFormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.subToFilterFormValueChanges();
  }

  private subToFilterFormValueChanges(): void {
    this._filterForm.valueChanges
      .pipe(
        filter((value): value is UsersFilterValueType => {
          const { email, role, status } = value;

          if (
            email === undefined &&
            role === undefined &&
            status === undefined
          ) {
            throw new Error('Incorrect form value!');
          }

          return true;
        }),
        tap((filterValue) => this.valueChange.emit(filterValue)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
