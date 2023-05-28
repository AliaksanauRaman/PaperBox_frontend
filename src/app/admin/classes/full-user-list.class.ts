import { BehaviorSubject, tap, Subject, takeUntil } from 'rxjs';

import { MutableFullUserListType } from '../types/full-user.type';
import { UsersFilterValueType } from '../types/users-filter-value.type';
import { UserRole } from '../../shared/enums/user-role.enum';
import { FullUserStatus } from '../enums/full-user-status.enum';
import { UsersRoleFilter } from './users-role-filter.class';
import { UsersStatusFilter } from './users-status-filter.class';
import { UsersEmailFilter } from './users-email-filter.class';

export class FullUserList {
  private readonly _fullUserList$ =
    new BehaviorSubject<MutableFullUserListType>([]);
  private readonly _filtered$ = new BehaviorSubject<MutableFullUserListType>(
    []
  );
  private readonly _destroy$ = new Subject<void>();

  public readonly value$ = this._filtered$.asObservable();

  constructor(initialValue: MutableFullUserListType) {
    this._fullUserList$
      .pipe(
        tap((fullUserList) => this._filtered$.next(fullUserList)),
        takeUntil(this._destroy$)
      )
      .subscribe();
    this._fullUserList$.next(initialValue);
  }

  public setValue(value: MutableFullUserListType): void {
    this._fullUserList$.next(value);
  }

  public filter(filterValue: UsersFilterValueType): void {
    const role = filterValue.role;
    const status = filterValue.status;
    const email = filterValue.email.toLowerCase();
    let filteredUsers = UsersRoleFilter.filter(
      role,
      this._fullUserList$.getValue()
    );
    filteredUsers = UsersStatusFilter.filter(status, filteredUsers);
    filteredUsers = UsersEmailFilter.filter(email, filteredUsers);
    this._filtered$.next(filteredUsers);
  }

  public makeAdminOne(userId: number): void {
    this.updateFullUserRole(userId, UserRole.ADMIN);
  }

  public makeUserOne(userId: number): void {
    this.updateFullUserRole(userId, UserRole.USER);
  }

  public activateOne(userId: number): void {
    this.updateFullUserStatus(userId, FullUserStatus.ACTIVE);
  }

  public inactivateOne(userId: number): void {
    this.updateFullUserStatus(userId, FullUserStatus.INACTIVE);
  }

  public blockOne(userId: number): void {
    this.updateFullUserStatus(userId, FullUserStatus.BLOCKED);
  }

  public destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private updateFullUserRole(userId: number, role: UserRole): void {
    this._fullUserList$.next(
      this._fullUserList$.getValue().map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            role,
          };
        }

        return user;
      })
    );
  }

  private updateFullUserStatus(userId: number, status: FullUserStatus): void {
    this._fullUserList$.next(
      this._fullUserList$.getValue().map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status,
          };
        }

        return user;
      })
    );
  }
}
