import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { RelevancePeriodPipe } from '@shared/pipes/relevance-period.pipe';

import { LocalizationsState } from '@store/localizations';
import { LocalizationLocale } from '@shared/enums/localization-locale.enum';

@Component({
  selector: 'app-application-card-dates',
  templateUrl: './application-card-dates.component.html',
  styleUrls: ['./application-card-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe, RelevancePeriodPipe],
})
export class ApplicationCardDatesComponent {
  @Select(LocalizationsState.currentLocale)
  public readonly _currentLocale$!: Observable<LocalizationLocale>;

  @Input()
  public set startDate(value: Date) {
    this._startDate = value;
  }

  @Input()
  public set endDate(value: Date | null) {
    this._endDate = value;
  }

  @Input()
  @HostBinding('class.active')
  public isActive = false;

  protected _startDate: Date | null = null;
  protected _endDate: Date | null = null;
}
