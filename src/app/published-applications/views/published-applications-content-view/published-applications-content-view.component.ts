import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { ListOfPublishedApplicationsComponent } from '../../components/list-of-published-applications/list-of-published-applications.component';
import { EmptyListOfPublishedApplicationsComponent } from '../../components/empty-list-of-published-applications/empty-list-of-published-applications.component';

import { ListOfPublishedApplicationsType } from '../../types/published-application.type';

@Component({
  selector: 'app-published-applications-content-view',
  templateUrl: './published-applications-content-view.component.html',
  styleUrls: ['./published-applications-content-view.component.scss'],
  host: { class: 'app-scrollbar' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ListOfPublishedApplicationsComponent,
    EmptyListOfPublishedApplicationsComponent,
  ],
})
export class PublishedApplicationsContentViewComponent {
  @Input()
  public set listOfPublishedApplications(
    value: ListOfPublishedApplicationsType
  ) {
    this._listOfPublishedApplications = value;
  }

  protected _listOfPublishedApplications: ListOfPublishedApplicationsType = [];
}
