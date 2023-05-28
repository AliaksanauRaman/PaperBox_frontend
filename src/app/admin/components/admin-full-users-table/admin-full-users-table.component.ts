import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import {
  FullUserType,
  MutableFullUserListType,
} from '../../types/full-user.type';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { FullUserStatus } from '../../enums/full-user-status.enum';

@Component({
  selector: 'app-admin-full-users-table',
  templateUrl: './admin-full-users-table.component.html',
  styleUrls: ['./admin-full-users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFullUsersTableComponent implements AfterViewInit {
  @Input()
  public set fullUsers(value: MutableFullUserListType) {
    this._dataSource = new MatTableDataSource(value);
    this._dataSource.paginator = this._matPaginator;
  }

  @Output()
  public readonly copyEmail = new EventEmitter<string>();

  @Output()
  public readonly promoteUser = new EventEmitter<number>();

  @Output()
  public readonly demoteUser = new EventEmitter<number>();

  @Output()
  public readonly activateUser = new EventEmitter<number>();

  @Output()
  public readonly deactivateUser = new EventEmitter<number>();

  @Output()
  public readonly blockUser = new EventEmitter<number>();

  @ViewChild(MatPaginator) private readonly _matPaginator: MatPaginator | null =
    null;

  protected _dataSource = new MatTableDataSource<FullUserType>([]);

  protected readonly _DISPLAYED_COLUMNS = [
    'number',
    'email',
    'role',
    'status',
    'actions',
  ] as const;
  protected readonly _UserRole = UserRole;
  protected readonly _UserStatus = FullUserStatus;

  public ngAfterViewInit(): void {
    this._dataSource.paginator = this._matPaginator;
  }
}
