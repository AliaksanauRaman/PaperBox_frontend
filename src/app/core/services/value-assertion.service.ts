import { Injectable } from '@angular/core';

import { EMAIL_FORMAT_REGEXP } from '../../shared/regexps/email-format.regexp';

@Injectable({
  providedIn: 'root',
})
// TODO: Unused
export class ValueAssertionService {
  public isNonEmptyString(value: string): boolean {
    return value !== '';
  }

  public doesStringLengthEqualOrMoreThan(
    value: string,
    length: number
  ): boolean {
    return value.length >= length;
  }

  public isEmailString(value: string): boolean {
    return EMAIL_FORMAT_REGEXP.test(value);
  }
}
