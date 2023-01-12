import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocationType } from '../../shared/types/location.type';
import { CountryType } from '../../shared/types/country.type';
import { BELARUSIAN_LOCATIONS } from '../../shared/constants/belarusian-locations.constant';
import { POLISH_LOCATIONS } from '../../shared/constants/polish-locations.constant';

// TODO: Enhance
@Injectable({
  providedIn: 'root',
})
export class LocationSelectionOptionsService {
  private readonly _locationsOfDeparture$ = new BehaviorSubject<
    ReadonlyArray<LocationType>
  >(this.getLocationsOfDeparture());
  private readonly _locationsOfDestination$ = new BehaviorSubject<
    ReadonlyArray<LocationType>
  >(this.getLocationsOfDestination(null));

  public readonly locationsOfDeparture$ =
    this._locationsOfDeparture$.asObservable();
  public readonly locationsOfDestination$ =
    this._locationsOfDestination$.asObservable();

  public handleDepartureLocationSelection(
    departureLocationValue: string
  ): void {
    const departureLocation = this.getAllLocations().find(
      (l) => l.value === departureLocationValue
    );

    if (departureLocation === undefined) {
      throw new Error('Impossible');
    }

    this._locationsOfDestination$.next(
      this.getLocationsOfDestination(departureLocation.country)
    );
  }

  private getLocationsOfDeparture(): ReadonlyArray<LocationType> {
    return this.getAllLocations();
  }

  private getAllLocations(): ReadonlyArray<LocationType> {
    return [...BELARUSIAN_LOCATIONS, ...POLISH_LOCATIONS];
  }

  private getLocationsOfDestination(
    departureCountry: CountryType | null
  ): ReadonlyArray<LocationType> {
    if (departureCountry === null) {
      return [];
    }

    return this.getAllLocations().filter(
      (location) => location.country.value !== departureCountry.value
    );
  }
}
