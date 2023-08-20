import { Injectable, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { PublishedApplicationsService } from './published-applications.service';

import {
  PublishedHelpRequests,
  PublishedHelpRequestsState,
} from '@store/published-help-requests';
import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedHelpRequests } from '@shared/models/published-help-request.model';

@Injectable()
export class PublishedHelpRequestsService extends PublishedApplicationsService {
  private readonly _store = inject(Store);

  @Select(PublishedHelpRequestsState.get)
  public readonly data$!: Observable<AsyncData<ListOfPublishedHelpRequests>>;

  public get(): void {
    this._store.dispatch(new PublishedHelpRequests.Get());
  }

  public destroyGet(): void {
    this._store.dispatch(new PublishedHelpRequests.DestroyGet());
  }

  public deleteOne(publishedApplicationId: number): void {
    this._store.dispatch(
      new PublishedHelpRequests.DeleteOne(publishedApplicationId)
    );
  }
}
