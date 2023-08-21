import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatesFormatterService {
  public toStringByLocale(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }

  public toUTCDate(date: Date): Date {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
  }
}
