import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormControl,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeUntil, tap } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../core/services/unique-id-generator.service';
import { AppLocaleService } from '../../../core/services/app-locale.service';

import { CustomControl } from '../../abstracts/custom-control.class';
import { DateControlValueType } from '../../types/date-control-value.type';

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
// TODO: Refactor this all!
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

  public readonly isMobileOrTablet$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map(({ matches }) => matches));
  protected readonly minDate = new Date();
  protected readonly maxDate = new Date(
    new Date().setMonth(this.minDate.getMonth() + 3)
  );
  protected readonly dateForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  protected readonly viewValue$ = this.dateForm.valueChanges.pipe(
    map(({ start, end }) => {
      if (start === null || start === undefined) {
        return '';
      }

      const formattedStartDate = this.formatDate(start);

      if (end === null || end === undefined || this.areDatesEqual(start, end)) {
        return formattedStartDate;
      }

      const formattedEndDate = this.formatDate(end);

      return `${formattedStartDate} - ${formattedEndDate}`;
    })
  );

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    private readonly dateAdapter: DateAdapter<Date>,
    private readonly localeService: AppLocaleService,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    super(uniqueIdGeneratorService, cdRef);

    this.controlPlaceholder = this.generateDefaultPlaceholder();
  }

  public ngOnInit(): void {
    this.dateAdapter.setLocale(this.localeService.currentLocale);
    this.dateForm.valueChanges
      .pipe(
        // TODO: Prevent redundant calls!!!
        tap(({ start, end }) => {
          if (start === undefined || end === undefined) {
            throw new Error('Values cannot be undefined!');
          }

          if (start?.getTime() === end?.getTime()) {
            this.onChange({ start, end: null });
            this.onValidatorChange();
            return;
          }

          this.onChange({ start, end });
          this.onValidatorChange();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public writeValue(value: DateControlValueType): void {
    // TODO: Assert value type
    // TODO: !IMPORTANT Fix the issue with initial value set!
    this.dateForm.setValue(value);
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

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat(this.localeService.currentLocale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }

  private areDatesEqual(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private onValidatorChange = () => {};

  private generateDefaultPlaceholder(): string {
    const now = new Date();
    return `${this.formatDate(now)} - ${this.formatDate(
      new Date(new Date().setDate(now.getDate() + 3))
    )}`;
  }
}
