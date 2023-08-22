import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { DatesComparerService } from '@shared/services/dates-comparer.service';

type DatesType = Readonly<{
  startDate: Date;
  endDate: Date | null;
}>;

@Pipe({
  name: 'dates',
  standalone: true,
})
export class DatesPipe implements PipeTransform {
  private readonly _datePipe = inject(DatePipe);
  private readonly _datesComparer = inject(DatesComparerService);

  public transform(value: DatesType, locale: string): string {
    const { startDate, endDate } = value;
    const dateFormat = this.determineDateFormatByLocale(locale);
    const formattedStartDate = this._datePipe.transform(
      startDate,
      dateFormat
    ) as string;

    if (endDate !== null) {
      if (this._datesComparer.areDatesEqual(startDate, endDate)) {
        return formattedStartDate;
      }

      const formattedEndDate = this._datePipe.transform(
        endDate,
        dateFormat
      ) as string;
      return `${formattedStartDate} - ${formattedEndDate}`;
    }

    return formattedStartDate;
  }

  // TODO: Enhance
  private determineDateFormatByLocale(locale: string): string {
    if (locale === 'be-BY') {
      return 'dd.MM.YYYY';
    }

    if (locale === 'en-GB') {
      return 'dd/MM/YYYY';
    }

    throw new Error(`No such locale: '${locale}'!`);
  }
}
