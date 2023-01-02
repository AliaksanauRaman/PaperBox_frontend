import { AppEventName } from './../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { FailedGetOneFullHelpOfferPayload } from './payload';

export class FailedGetOneFullHelpOffer
  implements AppEvent<FailedGetOneFullHelpOfferPayload>
{
  public readonly name = AppEventName.FAILED_GET_ONE_FULL_HELP_OFFER;
  public readonly payload: FailedGetOneFullHelpOfferPayload;

  constructor(payload: FailedGetOneFullHelpOfferPayload) {
    this.payload = payload;
  }
}
