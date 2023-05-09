import { HttpRequestWithParamsBaseService } from '../../../shared/abstracts/http-request-with-params-base-service.class';
import { DeleteApplicationResponseDataType } from '../../types/delete-application-response-data.type';

export interface DeleteApplicationStateService
  extends HttpRequestWithParamsBaseService<
    DeleteApplicationResponseDataType,
    number
  > {}
