import { Pipe, PipeTransform } from '@angular/core';

import { PhoneEntity } from '../entities/phone.entity';

@Pipe({
  name: 'phoneView',
  standalone: true,
})
export class PhoneViewPipe implements PipeTransform {
  public transform({ diallingCode, number }: PhoneEntity): string {
    return `${diallingCode} ${number}`;
  }
}
