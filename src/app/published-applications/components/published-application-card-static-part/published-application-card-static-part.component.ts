import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { ApplicationCardDirectionComponent } from '../application-card-direction/application-card-direction.component';
import { ApplicationCardFullNameComponent } from '../application-card-full-name/application-card-full-name.component';
import { ApplicationCardDatesComponent } from '../application-card-dates/application-card-dates.component';
import { ApplicationCardArrowBlockComponent } from '../application-card-arrow-block/application-card-arrow-block.component';

import { ApplicationCardExpandStateService } from '../../services/application-card-expand-state.service';
import { ApplicationCardActiveStateService } from '../../services/application-card-active-state.service';

import { PublishedApplicationType } from '../../types/published-application.type';

type PublishedApplicationInterface = Pick<
  PublishedApplicationType,
  'locationFrom' | 'locationTo' | 'fullName' | 'startDate' | 'endDate'
>;

@Component({
  selector: 'app-published-application-card-static-part',
  templateUrl: './published-application-card-static-part.component.html',
  styleUrls: ['./published-application-card-static-part.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ApplicationCardDirectionComponent,
    ApplicationCardFullNameComponent,
    ApplicationCardDatesComponent,
    ApplicationCardArrowBlockComponent,
  ],
})
export class PublishedApplicationCardStaticPartComponent {
  @Input()
  public set publishedApplication(value: PublishedApplicationInterface) {
    this._publishedApplication = value;
  }

  protected _publishedApplication?: PublishedApplicationInterface;

  protected readonly _expandStateService = inject(
    ApplicationCardExpandStateService
  );
  protected readonly _activeStateService = inject(
    ApplicationCardActiveStateService
  );
}
