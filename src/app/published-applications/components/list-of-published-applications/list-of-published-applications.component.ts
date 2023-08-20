import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { PublishedApplicationCardComponent } from '../published-application-card/published-application-card.component';

import {
  ListOfPublishedApplicationsType,
  PublishedApplicationType,
} from '../../types/published-application.type';

@Component({
  selector: 'app-list-of-published-applications',
  templateUrl: './list-of-published-applications.component.html',
  styleUrls: ['./list-of-published-applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, PublishedApplicationCardComponent],
})
export class ListOfPublishedApplicationsComponent {
  @Input()
  public set data(value: ListOfPublishedApplicationsType) {
    this._data = value;
  }

  protected _data: ListOfPublishedApplicationsType = [];

  protected trackByPublishedApplicationId(
    _index: number,
    publishedApplication: PublishedApplicationType
  ): number {
    return publishedApplication.id;
  }
}
