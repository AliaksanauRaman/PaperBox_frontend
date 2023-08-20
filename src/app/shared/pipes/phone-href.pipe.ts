import { Pipe, PipeTransform } from '@angular/core';

import { PhoneEntity } from '../entities/phone.entity';

@Pipe({
  name: 'phoneHref',
  standalone: true,
})
export class PhoneHrefPipe implements PipeTransform {
  public transform({ diallingCode, number }: PhoneEntity): string {
    return `tel:${diallingCode}${number}`;
  }
}
