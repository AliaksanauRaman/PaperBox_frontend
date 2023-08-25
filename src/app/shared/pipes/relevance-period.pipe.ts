import { Pipe, PipeTransform, inject } from '@angular/core';

import { DatesFormatterService } from '@shared/services/dates-formatter.service';
import { DatesComparerService } from '@shared/services/dates-comparer.service';

import { LocalizationLocale } from '@shared/enums/localization-locale.enum';

type RelevancePeriodType = Readonly<{
  startDate: Date;
  endDate: Date | null;
}>;

@Pipe({
  name: 'relevancePeriod',
  standalone: true,
})
export class RelevancePeriodPipe implements PipeTransform {
  private readonly _datesFormatter = inject(DatesFormatterService);
  private readonly _datesComparer = inject(DatesComparerService);

  public transform(
    value: RelevancePeriodType,
    locale = LocalizationLocale.BY
  ): string {
    const { startDate, endDate } = value;
    const formattedStartDate = this.format(startDate, locale);

    if (endDate === null) {
      return formattedStartDate;
    }

    if (this._datesComparer.areDatesEqual(startDate, endDate)) {
      return formattedStartDate;
    }

    return `${formattedStartDate} - ${this.format(endDate, locale)}`;
  }

  private format(date: Date, locale: string): string {
    return this._datesFormatter.toStringByLocale(date, locale);
  }
}
