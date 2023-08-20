import { Observable } from 'rxjs';

import { AsyncData } from '@shared/classes/async-data.class';
import { ListOfPublishedApplicationsType } from '../types/published-application.type';

export abstract class PublishedApplicationsService {
  public abstract readonly data$: Observable<
    AsyncData<ListOfPublishedApplicationsType>
  >;

  public abstract get(): void;
  public abstract destroyGet(): void;
  public abstract deleteOne(publishedApplicationId: number): void;
}
