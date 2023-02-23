import { Injectable } from '@angular/core';

import { HttpPostRequestServiceBase } from '../../shared/abstracts/http-post-request-service-base.class';
import { CreateHelpOfferDto } from '../../shared/dtos/create-help-offer.dto';
import { MakeCreateHelpOfferRequest, AppEventName } from '../../events';

@Injectable()
export class CreateHelpOfferRequestService extends HttpPostRequestServiceBase<
  MakeCreateHelpOfferRequest,
  CreateHelpOfferDto
> {
  public get successResponseEventName(): AppEventName {
    return AppEventName.SUCCESS_CREATE_HELP_OFFER;
  }

  public get failedResponseEventName(): AppEventName {
    return AppEventName.FAILED_CREATE_HELP_OFFER;
  }

  protected buildMakeRequestEvent(
    createHelpOfferDto: CreateHelpOfferDto
  ): MakeCreateHelpOfferRequest {
    return new MakeCreateHelpOfferRequest(createHelpOfferDto);
  }
}
