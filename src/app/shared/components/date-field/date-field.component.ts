import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  forwardRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  MatDatepickerModule,
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { takeUntil, tap } from 'rxjs';
import * as moment from 'moment';

import { DatesFormatterService } from '@shared/services/dates-formatter.service';
import { DatesComparerService } from '@shared/services/dates-comparer.service';

import { dateFormatsFactory } from './date-field.config';
import { DATE_FORMAT } from '@shared/dependencies/date-format';
import { BaseReactiveField } from '@shared/base/base-reactive-field.directive';
import { Late } from '@shared/types/late';
import { LocalizationsState } from '@store/localizations';

type MomentDate = moment.Moment;

@Component({
  selector: 'pu-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true,
    },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: dateFormatsFactory,
      deps: [DATE_FORMAT],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatDatepickerModule, MatMomentDateModule, ReactiveFormsModule],
})
export class DateFieldComponent
  extends BaseReactiveField<Date | null>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatDatepicker)
  private readonly _datepicker!: MatDatepicker<MomentDate>;

  private readonly _store = inject(Store);
  private readonly _datesFormatter = inject(DatesFormatterService);
  private readonly _datesComparer = inject(DatesComparerService);
  private readonly _dateAdapter: DateAdapter<MomentDate> = inject(DateAdapter);
  private readonly _initialValue = new Late<MomentDate>();

  // It does not have to be in sync with the current value
  // It is needed only to be able to reset the input value
  protected readonly _inputControl = new FormControl(null);

  public override writeValue(value: unknown): void {
    if (value !== null && !(value instanceof Date)) {
      throw new Error('A Date or null is expected!');
    }

    if (value === null) {
      this.writeNull(value);
      return;
    }

    this.writeDate(value);
  }

  public ngOnInit(): void {
    this._store
      .select(LocalizationsState.currentLocale)
      .pipe(
        tap((locale) => this._dateAdapter.setLocale(locale)),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  public ngAfterViewInit(): void {
    const initialValue = this._initialValue.value;

    if (initialValue !== undefined) {
      this._datepicker.select(initialValue);
    }
  }

  protected override getDefaultValue(): Date | null {
    return null;
  }

  protected handleDateChange(event: MatDatepickerInputEvent<MomentDate>): void {
    const { value } = event;

    if (value === null) {
      throw new Error('Null value is not expected!');
    }

    const selectedUtcDate = this._datesFormatter.toUTCDate(value.toDate());

    if (this.checkIsNewValue(selectedUtcDate)) {
      this._value.set(selectedUtcDate);
      this.onChange(selectedUtcDate);
    }
  }

  private writeNull(value: null): void {
    this._value.set(value);
  }

  private writeDate(value: Date): void {
    const utcDate = this._datesFormatter.toUTCDate(value);
    const momentDate = this._datesFormatter.toMomentDate(utcDate);
    this._initialValue.set(momentDate);
    this._value.set(utcDate);
  }

  private checkIsNewValue(value: Date): boolean {
    const currentValue = this._value();

    if (currentValue === null) {
      return true;
    }

    return !this._datesComparer.areDatesEqual(currentValue, value);
  }
}
