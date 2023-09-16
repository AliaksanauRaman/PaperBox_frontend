import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DevModeService } from '@core/services/dev-mode.service';

import { HttpService } from '@shared/abstracts/http-service.class';
import { PlacesHttpServiceInterface } from './places-http-service.interface';
import { PlacesHttpServiceMock } from './places-http-service.mock';
import { Place } from '@shared/types/place';

@Injectable({
  providedIn: 'root',
  useFactory: placesHttpServiceFactory,
  deps: [DevModeService],
})
export class PlacesHttpService
  extends HttpService
  implements PlacesHttpServiceInterface
{
  public getPlaces(): Observable<ReadonlyArray<Place>> {
    return this._httpClient.get<ReadonlyArray<Place>>(
      `${this._apiUrl}/api/places`,
      {
        context: this.getAuthorizedContext(),
      }
    );
  }
}

function placesHttpServiceFactory(
  devModeService: DevModeService
): PlacesHttpServiceInterface {
  if (devModeService.isOn()) {
    return new PlacesHttpServiceMock();
  }

  return new PlacesHttpService();
}
