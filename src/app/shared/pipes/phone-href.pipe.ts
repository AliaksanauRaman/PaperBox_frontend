import { Pipe, PipeTransform } from '@angular/core';

import { PhoneType } from '../types/phone.type';

@Pipe({
  name: 'phoneHref',
  standalone: true,
})
export class PhoneHrefPipe implements PipeTransform {
  public transform({ diallingCode, number }: PhoneType): string {
    return `tel:${diallingCode}${number}`;
  }
}
