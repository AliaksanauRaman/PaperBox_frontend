import { AppEvent } from '../../app-event.interface';
import { AppEventName } from '../../app-event-name.enum';
import { MakeGetOneFullHelpOfferRequestPayload } from './payload';

export class MakeGetOneFullHelpOfferRequest
  implements AppEvent<MakeGetOneFullHelpOfferRequestPayload>
{
  public readonly name = AppEventName.MAKE_GET_ONE_FULL_HELP_OFFER_REQUEST;
  public readonly payload: MakeGetOneFullHelpOfferRequestPayload;

  constructor(payload: MakeGetOneFullHelpOfferRequestPayload) {
    this.payload = payload;
  }
}
