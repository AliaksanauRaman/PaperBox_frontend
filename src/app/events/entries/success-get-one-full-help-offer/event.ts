import { AppEventName } from './../../app-event-name.enum';
import { AppEvent } from '../../app-event.interface';
import { SuccessGetOneFullHelpOfferPayload } from './payload';

export class SuccessGetOneFullHelpOffer
  implements AppEvent<SuccessGetOneFullHelpOfferPayload>
{
  public readonly name = AppEventName.SUCCESS_GET_ONE_FULL_HELP_OFFER;
  public readonly payload: SuccessGetOneFullHelpOfferPayload;

  constructor(payload: SuccessGetOneFullHelpOfferPayload) {
    this.payload = payload;
  }
}
