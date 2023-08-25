import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  NonNullableFormBuilder,
} from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { Store } from '@ngxs/store';
import { takeUntil, tap } from 'rxjs';

import { ScreenSizeObserverService } from '@core/services/screen-size-observer.service';
import { DatesComparerService } from '@shared/services/dates-comparer.service';
import { DatesFormatterService } from '@shared/services/dates-formatter.service';
import { UniqueIdGeneratorService } from '@core/services/unique-id-generator.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DateControlValueType } from '../../types/date-control-value.type';
import { LocalizationsState } from '@store/localizations';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateControlComponent
  extends CustomControl<DateControlValueType>
  implements OnInit, Validator
{
  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  @Input()
  public set required(value: boolean) {
    this.controlRequired = value;
  }

  @Input()
  public set placeholder(value: string) {
    this.controlPlaceholder = value;
  }

  private readonly _store = inject(Store);
  private readonly _screenSizeObserverService = inject(
    ScreenSizeObserverService
  );
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _datesFormatter = inject(DatesFormatterService);
  private readonly _datesComparer = inject(DatesComparerService);
  private readonly _dateAdapter: DateAdapter<Date> = inject(DateAdapter);

  protected readonly _currentLocale = this._store.selectSnapshot(
    LocalizationsState.currentLocale
  );
  protected readonly _isMobileOrTablet$ =
    this._screenSizeObserverService.isMobileOrTablet$;
  protected readonly _minDate = new Date();
  protected readonly _maxDate = new Date(
    new Date().setMonth(this._minDate.getMonth() + 3)
  );
  protected readonly _datesForm = this._formBuilder.group({
    start: [null as Date | null],
    end: [null as Date | null],
  });

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public ngOnInit(): void {
    this._dateAdapter.setLocale(this._currentLocale);
    this._datesForm.valueChanges
      .pipe(
        tap(({ start, end }) => {
          if (start === undefined || end === undefined) {
            throw new Error('Values cannot be undefined!');
          }

          if (start === null && end === null) {
            this.onChange({ start: null, end: null });
            this.onValidatorChange();
            return;
          }

          if (start !== null && end === null) {
            this.onChange({ start: this.toUTCDate(start), end: null });
            this.onValidatorChange();
            return;
          }

          if (start !== null && end !== null) {
            if (this._datesComparer.areDatesEqual(start, end)) {
              this.onChange({ start: this.toUTCDate(start), end: null });
              this.onValidatorChange();
              return;
            }

            this.onChange({
              start: this.toUTCDate(start),
              end: this.toUTCDate(end),
            });
            this.onValidatorChange();
            return;
          }

          throw new Error('Impossible combination of dates values!');
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: DateControlValueType): void {
    // TODO: Assert value type
    // TODO: !IMPORTANT Fix the issue with initial value set!
    this._datesForm.setValue(value);
  }

  public validate(thisControl: AbstractControl): ValidationErrors | null {
    const thisControlValue: DateControlValueType | null =
      thisControl.getRawValue();

    if (
      thisControlValue === null ||
      (thisControlValue.start === null && thisControlValue.end === null)
    ) {
      return { invalid: true };
    }

    return null;
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  public handleInputFocus(dateRangePicker: MatDateRangePicker<Date>): void {
    this.markControlAsFocused();
    this.toggleDateRangePicker(dateRangePicker);
  }

  public handleInputBlur(): void {
    this.handleControlBlur();
    this.markControlAsUnfocused();
  }

  public toggleDateRangePicker(
    dateRangePicker: MatDateRangePicker<Date>
  ): void {
    if (dateRangePicker.opened) {
      dateRangePicker.close();
    } else {
      dateRangePicker.open();
    }
  }

  private onValidatorChange = () => {};

  private toUTCDate(date: Date): Date {
    return this._datesFormatter.toUTCDate(date);
  }
}
