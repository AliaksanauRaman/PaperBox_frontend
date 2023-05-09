import { HttpRequestWithoutParamsBaseService } from '../../../shared/abstracts/http-request-without-params-base-service.class';
import { PublishedApplicationListType } from '../../types/published-application.type';

export interface GetPublishedApplicationsStateService
  extends HttpRequestWithoutParamsBaseService<PublishedApplicationListType> {}
