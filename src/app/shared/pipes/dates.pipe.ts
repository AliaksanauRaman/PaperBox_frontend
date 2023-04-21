import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

type DatesType = Readonly<{
  startDate: Date;
  endDate: Date | null;
}>;

@Pipe({
  name: 'dates',
  standalone: true,
})
export class DatesPipe implements PipeTransform {
  constructor(private readonly _datePipe: DatePipe) {}

  public transform(value: DatesType, locale: string): string {
    const { startDate, endDate } = value;
    const dateFormat = this.determineDateFormatByLocale(locale);
    const formattedStartDate = this._datePipe.transform(
      startDate,
      dateFormat
    ) as string;

    if (endDate !== null) {
      const formattedEndDate = this._datePipe.transform(
        startDate,
        dateFormat
      ) as string;
      return `${formattedStartDate} - ${formattedEndDate}`;
    }

    return formattedStartDate;
  }

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
