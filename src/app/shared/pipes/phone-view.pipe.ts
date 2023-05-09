import { Pipe, PipeTransform } from '@angular/core';

import { PhoneType } from '../types/phone.type';

@Pipe({
  name: 'phoneView',
  standalone: true,
})
export class PhoneViewPipe implements PipeTransform {
  public transform({ diallingCode, number }: PhoneType): string {
    return `${diallingCode} ${number}`;
  }
}
