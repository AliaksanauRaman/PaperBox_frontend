import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, takeUntil, tap, map } from 'rxjs';

import { AdminFullUsersHttpService } from '../../services/admin-full-users-http.service';

import { AdminContentPageComponent } from '../../classes/admin-content-page.component';
import { FullUserList } from '../../classes/full-user-list.class';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { FullUserStatus } from '../../enums/full-user-status.enum';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['../../styles/_admin-page-common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUsersPageComponent
  extends AdminContentPageComponent
  implements OnInit, OnDestroy
{
  protected _fullUserList = new FullUserList([]);
  protected _getAllFullUsersError = false;

  constructor(
    private readonly _adminFullUsersHttpService: AdminFullUsersHttpService,
    private readonly _clipboard: Clipboard,
    private readonly _cdRef: ChangeDetectorRef,
    matSnackBar: MatSnackBar
  ) {
    super(matSnackBar);
  }

  public ngOnInit(): void {
    this.makeHttpRequestToGetAllUsers();
  }

  public override ngOnDestroy(): void {
    this._fullUserList.destroy();
    super.ngOnDestroy();
  }

  protected handleCopyEmail(email: string): void {
    const isCopied = this._clipboard.copy(email);

    if (!isCopied) {
      throw new Error('Error during copying to the clipboard!');
    }

    this._matSnackBar.open(`'${email}' is copied to the clipboard!`, 'Ok', {
      duration: 3000,
    });
  }

  protected handlePromoteUser(userId: number): void {
    this._adminFullUsersHttpService
      .updateRoleOfOne(userId, UserRole.ADMIN)
      .pipe(
        tap(() => this._fullUserList.makeAdminOne(userId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handleDemoteUser(userId: number): void {
    this._adminFullUsersHttpService
      .updateRoleOfOne(userId, UserRole.USER)
      .pipe(
        tap(() => this._fullUserList.makeUserOne(userId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handleActivateUser(userId: number): void {
    this._adminFullUsersHttpService
      .updateStatusOfOne(userId, FullUserStatus.ACTIVE)
      .pipe(
        tap(() => this._fullUserList.activateOne(userId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handleDeactivateUser(userId: number): void {
    this._adminFullUsersHttpService
      .updateStatusOfOne(userId, FullUserStatus.INACTIVE)
      .pipe(
        tap(() => this._fullUserList.inactivateOne(userId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  protected handleBlockUser(userId: number): void {
    this._adminFullUsersHttpService
      .updateStatusOfOne(userId, FullUserStatus.BLOCKED)
      .pipe(
        tap(() => this._fullUserList.blockOne(userId)),
        catchError((error) => this.handleHttpRequestError(error)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private makeHttpRequestToGetAllUsers(): void {
    this._adminFullUsersHttpService
      .getAll()
      .pipe(
        map((list) => Array.from(list)),
        tap((fullUserList) => this._fullUserList.setValue(fullUserList)),
        catchError((error: unknown) => {
          this._getAllFullUsersError = true;
          throw error;
        }),
        finalize(() => {
          this._loading = false;
          this._cdRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
