import { Pipe, PipeTransform, inject } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';

import { DatesComparerService } from '@shared/services/dates-comparer.service';
import { DatesFormatterService } from '@shared/services/dates-formatter.service';

@Pipe({
  name: 'dateRangeAsString',
  standalone: true,
})
export class DateRangeAsStringPipe implements PipeTransform {
  private readonly _datesComparer = inject(DatesComparerService);
  private readonly _datesFormatter = inject(DatesFormatterService);

  public transform(value: DateRange<Date> | null, locale: string): string {
    if (value === null) {
      return '';
    }

    const startDate = value.start;
    const endDate = value.end;

    if (startDate === null && endDate === null) {
      return '';
    }

    if (startDate !== null && endDate === null) {
      return this.format(startDate, locale);
    }

    if (startDate !== null && endDate !== null) {
      const formattedStartDate = this.format(startDate, locale);

      if (this.areEqual(startDate, endDate)) {
        return formattedStartDate;
      }

      return `${formattedStartDate} - ${this.format(endDate, locale)}`;
    }

    throw new Error('Impossible combination of start and end dates!');
  }

  private areEqual(date1: Date, date2: Date): boolean {
    return this._datesComparer.areDatesEqual(date1, date2);
  }

  private format(date: Date, locale: string): string {
    return this._datesFormatter.toStringByLocale(date, locale);
  }
}
