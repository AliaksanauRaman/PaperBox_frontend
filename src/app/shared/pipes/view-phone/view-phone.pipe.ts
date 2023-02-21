import { Pipe, PipeTransform } from '@angular/core';

import { PhoneType } from '../../types/phone.type';

@Pipe({
  name: 'viewPhone',
})
export class ViewPhonePipe implements PipeTransform {
  public transform({ diallingCode, number }: PhoneType): string {
    return `${diallingCode} ${number}`;
  }
}
