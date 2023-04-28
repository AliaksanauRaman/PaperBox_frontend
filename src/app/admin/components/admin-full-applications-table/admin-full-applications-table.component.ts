import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import {
  FullApplicationListType,
  FullApplicationType,
} from '../../types/full-application.type';
import { FullApplicationStatus } from '../../enums/full-application-status.enum';

enum AdminFullApplicationsTableColumn {
  NUMBER = 'number',
  LOCATION_FROM = 'locationFrom',
  LOCATION_TO = 'locationTo',
  DATES = 'dates',
  FULL_NAME = 'fullName',
  STATUS = 'status',
  ACTIONS = 'actions',
}

const COLUMNS_TO_DISPLAY: ReadonlyArray<AdminFullApplicationsTableColumn> = [
  AdminFullApplicationsTableColumn.NUMBER,
  AdminFullApplicationsTableColumn.LOCATION_FROM,
  AdminFullApplicationsTableColumn.LOCATION_TO,
  AdminFullApplicationsTableColumn.DATES,
  AdminFullApplicationsTableColumn.FULL_NAME,
  AdminFullApplicationsTableColumn.STATUS,
  AdminFullApplicationsTableColumn.ACTIONS,
];

@Component({
  selector: 'app-admin-full-applications-table',
  templateUrl: './admin-full-applications-table.component.html',
  styleUrls: ['./admin-full-applications-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminFullApplicationsTableComponent {
  @Input()
  public set fullApplicationList(value: FullApplicationListType) {
    this._fullApplicationList = value;
  }

  @Output()
  public readonly publishApplication = new EventEmitter<FullApplicationType>();

  @Output()
  public readonly unpublishApplication =
    new EventEmitter<FullApplicationType>();

  @Output()
  public readonly rejectApplication = new EventEmitter<FullApplicationType>();

  @Output()
  public readonly deleteApplication = new EventEmitter<FullApplicationType>();

  protected readonly Column = AdminFullApplicationsTableColumn;
  protected readonly Status = FullApplicationStatus;
  protected _fullApplicationList: FullApplicationListType = [];
  protected _expandedElement: FullApplicationType | null = null;
  protected _columnsToDisplayWithExpand = [...COLUMNS_TO_DISPLAY, 'expand'];

  protected handleApplicationMenuClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  protected handlePublishButtonClick(application: FullApplicationType): void {
    this.publishApplication.emit(application);
  }

  protected handleUnpublishButtonClick(application: FullApplicationType): void {
    this.unpublishApplication.emit(application);
  }

  protected handleRejectButtonClick(application: FullApplicationType): void {
    this.rejectApplication.emit(application);
  }

  protected handleDeleteButtonClick(application: FullApplicationType): void {
    const isConfirmed = confirm(
      `Are you sure you want to delete the application with id: ${application.id}?`
    );

    if (isConfirmed) {
      this.deleteApplication.emit(application);
    }
  }
}
