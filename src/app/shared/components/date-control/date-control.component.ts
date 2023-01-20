import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatDateRangePicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { UniqueIdGeneratorService } from '../../../services/unique-id-generator.service';
import { AppLocaleService } from '../../../core/services/app-locale.service';

import { CustomControl } from '../../abstracts/custom-control.class';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// TODO: Refactor this all!
export class DateControlComponent
  extends CustomControl<string>
  implements OnInit
{
  public readonly minimalDate = new Date();
  public readonly maximalDate = new Date(
    new Date().setMonth(this.minimalDate.getMonth() + 3)
  );

  private readonly startDate$ = new BehaviorSubject<Date | null>(null);
  private readonly endDate$ = new BehaviorSubject<Date | null>(null);
  private readonly controlValue$ = combineLatest([
    this.startDate$.asObservable(),
    this.endDate$.asObservable(),
  ]).pipe(
    map(([startDate, endDate]) => {
      if (startDate?.getTime() === endDate?.getTime()) {
        return {
          start: startDate,
          end: null,
        };
      }

      return { start: startDate, end: endDate };
    })
  );

  protected readonly viewValue$ = this.controlValue$.pipe(
    map(({ start, end }) => {
      if (start === null) {
        return '';
      }

      const formattedStartDate = new Intl.DateTimeFormat('be-BY', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(start);

      if (end === null) {
        return formattedStartDate;
      }

      const formattedEndDate = new Intl.DateTimeFormat('be-BY', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(end);

      return `${formattedStartDate} - ${formattedEndDate}`;
    })
  );

  @Input()
  public set label(value: string) {
    this.controlLabel = value;
  }

  constructor(
    uniqueIdGeneratorService: UniqueIdGeneratorService,
    cdRef: ChangeDetectorRef,
    private readonly dateAdapter: DateAdapter<Date>,
    private readonly localeService: AppLocaleService,
  ) {
    super(uniqueIdGeneratorService, cdRef);
  }

  public ngOnInit(): void {
    this.controlValue$.subscribe((val) => console.log(val));
    this.dateAdapter.setLocale(this.localeService.currentLocale);
  }

  public writeValue(value: unknown): void {
    if (!this.isStringOrNull(value)) {
      throw new Error('Only strings and null are allowed!');
    }

    // this.inputValue = value === null ? '' : value;
    this.cdRef.markForCheck();
  }

  public handleStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.startDate$.next(event.value);
  }

  public handleEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.endDate$.next(event.value);
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

  private isStringOrNull(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
  }
}
