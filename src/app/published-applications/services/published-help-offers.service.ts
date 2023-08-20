import { Injectable, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { PublishedApplicationsService } from './published-applications.service';

import {
  PublishedHelpOffers,
  PublishedHelpOffersState,
} from '@store/published-help-offers';
import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedHelpOffers } from '@shared/models/published-help-offer.model';

@Injectable()
export class PublishedHelpOffersService extends PublishedApplicationsService {
  private readonly _store = inject(Store);

  @Select(PublishedHelpOffersState.get)
  public readonly data$!: Observable<AsyncData<ListOfPublishedHelpOffers>>;

  public get(): void {
    this._store.dispatch(new PublishedHelpOffers.Get());
  }

  public destroyGet(): void {
    this._store.dispatch(new PublishedHelpOffers.DestroyGet());
  }

  public deleteOne(publishedApplicationId: number): void {
    this._store.dispatch(
      new PublishedHelpOffers.DeleteOne(publishedApplicationId)
    );
  }
}
