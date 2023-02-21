import { Pipe, PipeTransform } from '@angular/core';

import { PhoneType } from '../../types/phone.type';

@Pipe({
  name: 'buildPhoneHref',
})
export class BuildPhoneHrefPipe implements PipeTransform {
  public transform({ diallingCode, number }: PhoneType): string {
    return `tel:${diallingCode}${number}`;
  }
}
