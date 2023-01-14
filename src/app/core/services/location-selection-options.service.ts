import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ALL_LOCATIONS, AllLocationsType } from '../dependencies/all-locations';

import { LocationType } from '../../shared/types/location.type';
import { CountryType } from '../../shared/types/country.type';

// TODO: Enhance, check if it used
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

  constructor(
    @Inject(ALL_LOCATIONS)
    private readonly allLocations: AllLocationsType
  ) {}

  public handleDepartureLocationSelection(
    departureLocationValue: string
  ): void {
    const departureLocation = this.allLocations.find(
      ({ value }) => value === departureLocationValue
    );

    if (departureLocation === undefined) {
      throw new Error('Impossible');
    }

    this._locationsOfDestination$.next(
      this.getLocationsOfDestination(departureLocation.country)
    );
  }

  private getLocationsOfDeparture(): ReadonlyArray<LocationType> {
    return this.allLocations;
  }

  private getLocationsOfDestination(
    departureCountry: CountryType | null
  ): ReadonlyArray<LocationType> {
    if (departureCountry === null) {
      return [];
    }

    return this.allLocations.filter(
      ({ country }) => country.value !== departureCountry.value
    );
  }
}
