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
import { map, takeUntil, tap } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';
import { AppLocaleService } from '../../../core/services/app-locale.service';

import { CustomControl } from '../../abstracts/custom-control.class';

type DateControlValue = Readonly<{
  start: Date | null;
  end: Date | null;
}>;

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
  extends CustomControl<DateControlValue>
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

      if (
        end === null ||
        end === undefined ||
        start.getTime() === end.getTime()
      ) {
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
    private readonly localeService: AppLocaleService
  ) {
    super(uniqueIdGeneratorService, cdRef);
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

  public writeValue(value: DateControlValue): void {
    // TODO: Assert value type

    this.dateForm.setValue(value);
  }

  public validate(thisControl: AbstractControl): ValidationErrors | null {
    const thisControlValue: DateControlValue | null = thisControl.getRawValue();

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

  private onValidatorChange = () => {};
}
