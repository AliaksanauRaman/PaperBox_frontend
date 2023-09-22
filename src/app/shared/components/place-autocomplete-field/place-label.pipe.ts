import { Pipe, PipeTransform } from '@angular/core';

import { Place } from '@shared/types/place';

@Pipe({
  name: 'puPlaceLabel',
  pure: true,
  standalone: true,
})
export class PlaceLabelPipe implements PipeTransform {
  public transform(value: Place): string {
    return `${value.getCountryLabel()} ${value.getCityLabel()}`;
  }
}
