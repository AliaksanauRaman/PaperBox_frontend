import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  HostBinding,
} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { DatesPipe } from '@shared/pipes/dates.pipe';

import { AppLocaleService } from '@core/services/app-locale.service';

@Component({
  selector: 'app-application-card-dates',
  templateUrl: './application-card-dates.component.html',
  styleUrls: ['./application-card-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe, DatesPipe],
})
export class ApplicationCardDatesComponent {
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
  // TODO: Probably it can be implemented in a better way
  protected readonly _localeService = inject(AppLocaleService);
}
