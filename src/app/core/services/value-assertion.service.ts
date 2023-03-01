import { Injectable } from '@angular/core';

import { emailRegExp } from '../../shared/regexps/email.regexp';

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
    return emailRegExp.test(value);
  }
}
